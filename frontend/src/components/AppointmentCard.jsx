import StatusBadge from "./StatusBadge";

// Formats "14:00:00" -> "2:00 PM" for friendlier display
function formatTime(timeString) {
  const [hoursStr, minutes] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes} ${period}`;
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function AppointmentCard({ appointment, onEdit, onComplete, onCancel }) {
  const isScheduled = appointment.status === "scheduled";

  return (
    <article className={`card card--${appointment.status}`}>
      <div className="card__header">
        <h3 className="card__title">{appointment.title}</h3>
        <StatusBadge status={appointment.status} />
      </div>

      {appointment.description && (
        <p className="card__description">{appointment.description}</p>
      )}

      <p className="card__time">
        {formatDate(appointment.date)} &nbsp;&middot;&nbsp;{" "}
        {formatTime(appointment.start_time)} &ndash;{" "}
        {formatTime(appointment.end_time)}
      </p>

      {isScheduled && (
        <div className="card__actions">
          <button className="btn btn--ghost" onClick={() => onEdit(appointment)}>
            Edit
          </button>
          <button
            className="btn btn--success"
            onClick={() => onComplete(appointment.id)}
          >
            Mark complete
          </button>
          <button
            className="btn btn--danger"
            onClick={() => onCancel(appointment.id)}
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  );
}

export default AppointmentCard;
