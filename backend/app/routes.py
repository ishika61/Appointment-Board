from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Appointment
from app.schemas import AppointmentCreate, AppointmentUpdate, AppointmentResponse

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














@router.post("/", response_model=AppointmentResponse, status_code=201)
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
):
    existing_appointments = (
        db.query(Appointment)
        .filter(
            Appointment.date == appointment.date,
            Appointment.status == "scheduled",
            Appointment.start_time < appointment.end_time,
            Appointment.end_time > appointment.start_time,
        )
        .first()
    )

    if existing_appointments:
        raise HTTPException(
            status_code=409,
            detail="This time slot overlaps with an existing appointment.",
        )

    new_appointment = Appointment(
        title=appointment.title,
        description=appointment.description,
        date=appointment.date,
        start_time=appointment.start_time,
        end_time=appointment.end_time,
        status="scheduled",
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return new_appointment









@router.put("/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(
    appointment_id: int,
    appointment: AppointmentUpdate,
    db: Session = Depends(get_db),
):
    existing_appointment = (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not existing_appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    conflicting_appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id != appointment_id,
            Appointment.date == appointment.date,
            Appointment.status == "scheduled",
            Appointment.start_time < appointment.end_time,
            Appointment.end_time > appointment.start_time,
        )
        .first()
    )

    if conflicting_appointment:
        raise HTTPException(
            status_code=409,
            detail="This time slot overlaps with an existing appointment.",
        )

    existing_appointment.title = appointment.title
    existing_appointment.description = appointment.description
    existing_appointment.date = appointment.date
    existing_appointment.start_time = appointment.start_time
    existing_appointment.end_time = appointment.end_time

    db.commit()
    db.refresh(existing_appointment)

    return existing_appointment













@router.patch("/{appointment_id}/complete", response_model=AppointmentResponse)
def complete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    appointment = (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    if appointment.status == "cancelled":
        raise HTTPException(
            status_code=400,
            detail="Cancelled appointment cannot be completed.",
        )

    if appointment.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Appointment is already completed.",
        )

    appointment.status = "completed"

    db.commit()
    db.refresh(appointment)

    return appointment








@router.patch("/{appointment_id}/cancel", response_model=AppointmentResponse)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    appointment = (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found.",
        )

    if appointment.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Completed appointment cannot be cancelled.",
        )

    if appointment.status == "cancelled":
        raise HTTPException(
            status_code=400,
            detail="Appointment is already cancelled.",
        )

    appointment.status = "cancelled"

    db.commit()
    db.refresh(appointment)

    return appointment