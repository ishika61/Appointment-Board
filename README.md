# Appointment Board

A simple full-stack appointment board built for the Full Stack Developer Intern practical task.

The application allows a small team to view and manage appointments from one place. Users can add, edit, complete, cancel, and filter appointments.

## Features

- View all appointments
- Add a new appointment
- Edit an existing appointment
- Mark an appointment as completed
- Cancel an appointment
- Filter appointments by date
- Filter appointments by status
- Prevent overlapping appointments
- Validate appointment time before saving
- Show success and error messages
- Cancelled appointments remain visible and are clearly marked
- Includes sample appointments for quick review

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy

### Database
- PostgreSQL

## How It Works

The frontend is built with React and communicates with the FastAPI backend using REST APIs.

The backend handles appointment creation, updating, completing, cancelling, filtering, and time-slot validation.

Appointment data is stored in PostgreSQL, so the data remains available after refreshing the page.

## Appointment Validation

When adding or editing an appointment, the application checks:

- Title is provided
- Date is provided
- Start time is provided
- End time is provided
- End time is after start time
- The selected time does not overlap with another scheduled appointment

If a time slot is already being used, the backend returns an error and the frontend displays it to the user.

## Appointment Status

Appointments can have three statuses:

- **Scheduled** – appointment is active
- **Completed** – appointment has been completed
- **Cancelled** – appointment has been cancelled

Cancelled appointments are kept visible on the board and are clearly marked as cancelled.

### Assumption

A cancelled or completed appointment does not block its previous time slot. The time slot can therefore be used for a new scheduled appointment.

## Sample Data

The project includes a seed script with sample appointments in different states so the board can be reviewed immediately.

To add the sample data:

```bash
cd backend
python -m app.seed
```
```Project Structure

Appointment Board/
├── backend/
│   └── app/
│       ├── database.py
│       ├── main.py
│       ├── models.py
│       ├── routes.py
│       ├── schemas.py
│       └── seed.py
│
└── frontend/
    └── src/
        ├── api/
        │   └── appointments.js
        ├── components/
        │   ├── AppointmentBoard.jsx
        │   ├── AppointmentCard.jsx
        │   ├── AppointmentForm.jsx
        │   ├── FilterBar.jsx
        │   ├── StatusBadge.jsx
        │   └── Toast.jsx
        ├── App.jsx
        ├── App.css
        └── index.css



```
1.Setup and Running
```

Clone the repository

git clone <your-github-repository-url>
cd "Appointment Board"


```
2.Backend Setup
```
Go to the backend folder:
cd backend

```
Create a virtual environment:
```
python -m venv venv

```
Activate it on Windows:
```
venv\Scripts\activate

```
Install the required packages:
```
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv

```
Create a .env file inside the backend folder:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/appointment_board

Make sure PostgreSQL is running and the appointment_board database exists.
```
Add the sample appointments:
```
python -m app.seed
```
Start the backend:
```
uvicorn app.main:app --reload
```
The API will run at:
```
http://localhost:8000
```
3. Frontend Setup
 ```
Open another terminal and go to the frontend folder:
cd frontend
```
Install dependencies:
```
npm install
```
Start the frontend:
```
npm run dev
```
Open the local URL shown by Vite, normally:
```
http://localhost:5173
Both the frontend and backend should be running at the same time.


```
API Endpoints:
```
Method	Endpoint	Purpose
GET	/appointments/	           Get appointments and apply date/status filters
POST	/appointments/	         Create an appointment
PUT	/appointments/{id}         Update an appointment
PATCH	/appointments/{id}/      complete	Mark an appointment as completed
PATCH	/appointments/{id}/      cancel	Cancel an appointment
```
Notes:
```
PostgreSQL is used to store appointment data.
The frontend and backend run separately during development.
CORS is configured for the local React development server.
The .env file should not be committed to the repository.

```
This project was developed as part of the Full Stack Developer Intern Practical Task – Appointment Board.
```
```
### What you needed to add

Your original README already covered the **features and explanation** well. I added:
```
- ✅ Setup instructions
- ✅ PostgreSQL `.env` setup
- ✅ How to run backend
- ✅ How to run frontend
- ✅ API endpoint table
- ✅ Notes about `.env`
- ✅ Fixed the Markdown/code-block formatting
- ✅ Clearer explanation of the assumption
- ✅ Proper project structure formatting
```
**One thing you must change before pushing:** replace `<your-github-repository-url>` with your actual repository URL.

And **never put your real PostgreSQL password in README or GitHub.**
