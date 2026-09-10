function AppointmentCard({ appointment }) {
  return (
    <div className={`appointment-card status-${appointment.status}`}>
      <div className="card-header">
        <h3>{appointment.title}</h3>
        <span className="status-badge">{appointment.status}</span>
      </div>

      {appointment.description && <p>{appointment.description}</p>}

      <p>
        {appointment.date} • {appointment.start_time} - {appointment.end_time}
      </p>
    </div>
  );
}

export default AppointmentCard;