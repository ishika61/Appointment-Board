from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Appointment
from app.schemas import AppointmentCreate, AppointmentResponse

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.get("/", response_model=list[AppointmentResponse])
def get_appointments(
    date_filter: date | None = Query(default=None, alias="date"),
    status: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Appointment)

    if date_filter:
        query = query.filter(Appointment.date == date_filter)

    if status:
        query = query.filter(Appointment.status == status)

    return query.order_by(
        Appointment.date,
        Appointment.start_time
    ).all()