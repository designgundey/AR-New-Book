# Arundhati Roy Book Launch — PRD

## Problem statement
Create a cleaner website for Arundhati Roy's new book launch "मेरी माँ मेरी गैंगस्टर / Mother Mary Comes To Me", referring to the attached original page. All fonts must be Google Sans — headings medium (500), body regular (400).

## User choices
- Payment: dummy checkout (real gateway added later)
- Language: bilingual Hindi + English
- Layout: simplified (fewer sections)
- Images: curated stock imagery for now

## Architecture
- Frontend: React (CRA) + Tailwind + shadcn/ui + sonner
- Backend: FastAPI + MongoDB (motor)
- Fonts: Google Sans (link tag), Noto Sans Devanagari fallback

## Implemented (2026-12)
- Backend: `GET /api/inventory`, `POST /api/reservations` with edition numbering out of 1500
- Frontend sections: TopStrip marquee, Nav, Hero, About, Edition (signed detail + progress), Reservation form, Footer
- Google Sans site-wide, medium headings, regular body
- Paper-tone palette, blue gel-pen accent, editorial spacing
- Reservation flow with success state showing edition number

## Backlog (P1 next)
- Real payment gateway (Razorpay) — user will provide keys
- Author-supplied cover imagery + campaign shots (user will provide)
- Optional: admin dashboard to view reservations
- Email confirmation on reservation (Resend)

## Backlog (P2)
- Multilingual toggle
- Countdown to launch date
- Testimonials / press quotes
