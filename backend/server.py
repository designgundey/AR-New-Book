from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


TOTAL_COPIES = 1500
PRICE_INR = 550


class ReservationCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=20)
    address: str = Field(..., min_length=4, max_length=400)
    city: str = Field(..., min_length=1, max_length=80)
    pin_code: str = Field(..., min_length=3, max_length=12)
    copies: int = Field(default=1, ge=1, le=3)

    @field_validator("phone")
    @classmethod
    def clean_phone(cls, v: str) -> str:
        return v.strip()


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    edition_number: int
    full_name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    pin_code: str
    copies: int
    total_amount_inr: int
    payment_status: str = "demo_paid"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReservationResponse(BaseModel):
    id: str
    edition_number: int
    total_amount_inr: int
    copies: int
    full_name: str
    payment_status: str


class InventoryStatus(BaseModel):
    total: int
    reserved: int
    remaining: int
    price_inr: int


@api_router.get("/")
async def root():
    return {"message": "Arundhati Roy — Book Launch API"}


@api_router.get("/inventory", response_model=InventoryStatus)
async def get_inventory():
    reserved_agg = await db.reservations.aggregate([
        {"$group": {"_id": None, "count": {"$sum": "$copies"}}}
    ]).to_list(1)
    reserved = int(reserved_agg[0]["count"]) if reserved_agg else 0
    remaining = max(TOTAL_COPIES - reserved, 0)
    return InventoryStatus(total=TOTAL_COPIES, reserved=reserved, remaining=remaining, price_inr=PRICE_INR)


@api_router.post("/reservations", response_model=ReservationResponse)
async def create_reservation(payload: ReservationCreate):
    reserved_agg = await db.reservations.aggregate([
        {"$group": {"_id": None, "count": {"$sum": "$copies"}}}
    ]).to_list(1)
    reserved = int(reserved_agg[0]["count"]) if reserved_agg else 0

    if reserved + payload.copies > TOTAL_COPIES:
        raise HTTPException(status_code=409, detail="Not enough signed copies remaining.")

    edition_number = reserved + 1
    total_amount = PRICE_INR * payload.copies

    reservation = Reservation(
        edition_number=edition_number,
        full_name=payload.full_name.strip(),
        email=payload.email,
        phone=payload.phone,
        address=payload.address.strip(),
        city=payload.city.strip(),
        pin_code=payload.pin_code.strip(),
        copies=payload.copies,
        total_amount_inr=total_amount,
        payment_status="demo_paid",
    )

    doc = reservation.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.reservations.insert_one(doc)

    return ReservationResponse(
        id=reservation.id,
        edition_number=reservation.edition_number,
        total_amount_inr=reservation.total_amount_inr,
        copies=reservation.copies,
        full_name=reservation.full_name,
        payment_status=reservation.payment_status,
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
