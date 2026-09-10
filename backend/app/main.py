from fastapi import FastAPI

from app.database import Base, engine
from app.models import Appointment
from app.routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Appointment Board")

app.include_router(router)


@app.get("/")
def root():
    return {"message": "Appointment Board API is running"}