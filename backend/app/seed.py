"""
Seed script: inserts a few sample appointments so the board can be
reviewed immediately.

Run with:
    python -m app.seed
"""
from datetime import date, time, timedelta

from app.database import Base, engine, SessionLocal
from app.models import Appointment

Base.metadata.create_all(bind=engine)

today = date.today()

SAMPLE_APPOINTMENTS = [
    {
        "title": "Client Kickoff Call",
        "description": "Introductory call with new client to discuss project scope.",
        "date": today,
        "start_time": time(10, 0),
        "end_time": time(10, 30),
        "status": "scheduled",
    },
    {
        "title": "Team Standup",
        "description": "Daily sync with the development team.",
        "date": today,
        "start_time": time(11, 0),
        "end_time": time(11, 15),
        "status": "scheduled",
    },
    {
        "title": "Design Review",
        "description": "Review UI mockups for the appointment board.",
        "date": today + timedelta(days=1),
        "start_time": time(14, 0),
        "end_time": time(15, 0),
        "status": "scheduled",
    },
    {
        "title": "Dentist Appointment",
        "description": "Routine dental checkup.",
        "date": today - timedelta(days=1),
        "start_time": time(9, 0),
        "end_time": time(9, 30),
        "status": "completed",
    },
    {
        "title": "Vendor Meeting",
        "description": "Meeting cancelled due to vendor unavailability.",
        "date": today + timedelta(days=2),
        "start_time": time(16, 0),
        "end_time": time(16, 30),
        "status": "cancelled",
    },
]


def seed():
    db = SessionLocal()
    try:
        if db.query(Appointment).count() > 0:
            print("Appointments already exist — skipping seed.")
            return

        for data in SAMPLE_APPOINTMENTS:
            db.add(Appointment(**data))

        db.commit()
        print(f"Inserted {len(SAMPLE_APPOINTMENTS)} sample appointments.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
