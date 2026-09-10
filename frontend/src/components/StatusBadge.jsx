// Small reusable badge that shows an appointment's status
// with consistent colors across the whole app.
function StatusBadge({ status }) {
  const labels = {
    scheduled: "Scheduled",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span className={`status-badge status-badge--${status}`}>
      {labels[status] || status}
    </span>
  );
}

export default StatusBadge;
