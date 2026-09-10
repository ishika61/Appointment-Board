// A single dismissible banner for success or error feedback.
function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status">
      <span>{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss">
        &times;
      </button>
    </div>
  );
}

export default Toast;
