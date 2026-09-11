# Appointment Board

A simple full-stack appointment board built for the Full Stack Developer Intern practical task. It lets a small team view, add, edit, complete, cancel, and filter appointments — all from one board.

**Stack:** React (Vite, JavaScript) on the frontend, Python (FastAPI + SQLAlchemy) on the backend, PostgreSQL for storage.

## Features

- View all appointments on a board
- Add a new appointment
- Edit an existing appointment
- Mark an appointment as completed
- Cancel an appointment
- Filter by date and by status
- Prevent two appointments from overlapping on the same date/time
- Validate required fields and that end time is after start time
- Clear success and error messages for every action
- Cancelled appointments stay visible and are clearly marked
- Sample appointments included so the board can be reviewed immediately

## How it works

The React frontend talks to the FastAPI backend over a REST API. All appointment data is stored in PostgreSQL, so it persists across page refreshes and server restarts.

When adding or editing an appointment, the app checks that:
- Title, date, start time, and end time are all provided
- End time is after start time
- The selected time slot doesn't overlap another **scheduled** appointment on the same date

The end-time and overlap checks run twice — once in the browser before anything is sent, and again in the backend, so the rule can't be bypassed by calling the API directly. If a time slot is taken, the backend returns a clear error message, and the frontend shows it to the user.

### Appointment status

Every appointment is in one of three states:

- **Scheduled** — active and upcoming
- **Completed** — finished
- **Cancelled** — cancelled, but still shown on the board with a clear "Cancelled" label

### Assumption

A cancelled or completed appointment does **not** block its original time slot — that slot becomes available again for a new scheduled appointment. Only two *scheduled* appointments can conflict with each other.

## Project structure
```
Appointment Board/
├── backend/
│ └── app/
│ ├── database.py # DB connection/session setup
│ ├── main.py # FastAPI app, CORS config
│ ├── models.py # SQLAlchemy Appointment model
│ ├── routes.py # All /appointments endpoints
│ ├── schemas.py # Pydantic request/response schemas
│ └── seed.py # Inserts sample appointments
|____
└── frontend/
└── src/
├── api/
│ └── appointments.js # All API calls to the backend
├── components/
│ ├── AppointmentBoard.jsx
│ ├── AppointmentCard.jsx
│ ├── AppointmentForm.jsx
│ ├── FilterBar.jsx
│ ├── StatusBadge.jsx
│ └── Toast.jsx
├── App.jsx
├── App.css
└── index.css
```



## API endpoints

| Method | Endpoint                      | Purpose                                   |
|--------|--------------------------------|--------------------------------------------|
| GET    | `/appointments/`              | List appointments (optional `date`/`status` filters) |
| POST   | `/appointments/`              | Create an appointment                     |
| PUT    | `/appointments/{id}`          | Update an appointment                     |
| PATCH  | `/appointments/{id}/complete` | Mark an appointment as completed          |
| PATCH  | `/appointments/{id}/cancel`   | Cancel an appointment                     |

## Setup and running

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd "Appointment Board"
```

### 2. Backend setup


```
cd backend
python -m venv venv
venv\Scripts\activate        # on Windows
# source venv/bin/activate   # on macOS/Linux
pip install -r requirements.txt
​```
```

Create a `.env` file inside `backend/`:

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/appointment_board


Make sure PostgreSQL is running and the `appointment_board` database already exists.

Load the sample appointments:

```bash
python -m app.seed
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173`.

Both servers need to be running at the same time for the app to work.

## Notes

- PostgreSQL is used to persist appointment data.
- CORS is configured on the backend to allow requests from the local React dev server only.
- `.env` is not committed to the repository — create your own locally using the example above.

---

This project was developed as part of the Full Stack Developer Intern practical task — Appointment Board.

