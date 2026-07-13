"""Backend API tests for Arundhati Roy book launch.

Endpoints tested:
- GET /api/            (root)
- GET /api/inventory   (inventory status)
- POST /api/reservations (create signed edition reservation)
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://arundhati-reads.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _valid_payload(copies=1):
    unique = uuid.uuid4().hex[:8]
    return {
        "full_name": f"TEST_User {unique}",
        "email": f"test_{unique}@example.com",
        "phone": "+91 9876543210",
        "address": "TEST_ 12 Rose Lane, Green Park",
        "city": "New Delhi",
        "pin_code": "110016",
        "copies": copies,
    }


# ---------- Root ----------
class TestRoot:
    def test_api_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data


# ---------- Inventory ----------
class TestInventory:
    def test_inventory_shape(self, api_client):
        r = api_client.get(f"{API}/inventory")
        assert r.status_code == 200
        data = r.json()
        assert set(["total", "reserved", "remaining", "price_inr"]).issubset(data.keys())
        assert data["total"] == 1500
        assert data["price_inr"] == 1499
        assert isinstance(data["reserved"], int)
        assert data["remaining"] == data["total"] - data["reserved"]


# ---------- Reservations ----------
class TestReservations:
    def test_create_reservation_valid(self, api_client):
        # Snapshot inventory before
        inv_before = api_client.get(f"{API}/inventory").json()

        payload = _valid_payload(copies=1)
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 200, f"Expected 200, got {r.status_code} body={r.text}"
        data = r.json()

        # Response structure & values
        assert "id" in data and isinstance(data["id"], str)
        assert isinstance(data["edition_number"], int)
        assert data["edition_number"] >= 1
        assert data["copies"] == 1
        assert data["total_amount_inr"] == 1499
        assert data["payment_status"] == "demo_paid"
        assert data["full_name"] == payload["full_name"]

        # Inventory should decrement by 1
        inv_after = api_client.get(f"{API}/inventory").json()
        assert inv_after["reserved"] == inv_before["reserved"] + 1
        assert inv_after["remaining"] == inv_before["remaining"] - 1
        # Edition number returned should equal reserved-after-this
        assert data["edition_number"] == inv_after["reserved"]

    def test_create_reservation_multiple_copies(self, api_client):
        inv_before = api_client.get(f"{API}/inventory").json()
        payload = _valid_payload(copies=3)
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["copies"] == 3
        assert data["total_amount_inr"] == 1499 * 3

        inv_after = api_client.get(f"{API}/inventory").json()
        assert inv_after["reserved"] == inv_before["reserved"] + 3

    def test_invalid_email(self, api_client):
        payload = _valid_payload()
        payload["email"] = "not-an-email"
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code in (400, 422), r.text

    def test_missing_required_field(self, api_client):
        payload = _valid_payload()
        del payload["full_name"]
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code in (400, 422), r.text

    def test_copies_too_high(self, api_client):
        payload = _valid_payload(copies=4)
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code in (400, 422), r.text

    def test_copies_zero(self, api_client):
        payload = _valid_payload(copies=0)
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code in (400, 422), r.text

    def test_short_full_name(self, api_client):
        payload = _valid_payload()
        payload["full_name"] = "A"  # min_length=2
        r = api_client.post(f"{API}/reservations", json=payload)
        assert r.status_code in (400, 422), r.text
