import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import AppointmentCard from "./AppointmentCard";

function AppointmentBoard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="board">
      <h2>Appointments</h2>

      {error && <p className="error-message">{error}</p>}

      {appointments.length === 0 && !error && <p>No appointments yet.</p>}

      <div className="board-list">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
      </div>
    </div>
  );
}

export default AppointmentBoard;