from datetime import date, time, datetime
from typing import Optional, Literal

from pydantic import BaseModel, Field, model_validator


class AppointmentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    date: date
    start_time: time
    end_time: time

    @model_validator(mode="after")
    def validate_time(self):
        if self.end_time <= self.start_time:
            raise ValueError("End time must be after start time")
        return self


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(AppointmentBase):
    pass


class AppointmentResponse(AppointmentBase):
    id: int
    status: Literal["scheduled", "completed", "cancelled"]
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {
        "from_attributes": True
    }