

// A single dismissible banner for success or error feedback.
function Toast({ message, type, onClose }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`toast toast--${type}`}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <span className="toast__content">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {isError ? (
            <path
              d="M10 6.5v4M10 13.5h.01M10 2.5l7.5 13H2.5l7.5-13Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 10.5 8 14l8-8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <span>{message}</span>
      </span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss">
        &times;
      </button>
    </div>
  );
}

export default Toast;

