
import { useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  start_time: "",
  end_time: "",
};

// Reused for both "Add appointment" and "Edit appointment".
// If `initialData` is provided, the form is pre-filled for editing.
function AppointmentForm({ initialData, onSubmit, onCancel, isSaving }) {
  const isEditing = Boolean(initialData);

  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description || "",
          date: initialData.date,
          start_time: initialData.start_time.slice(0, 5),
          end_time: initialData.end_time.slice(0, 5),
        }
      : EMPTY_FORM
  );
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear that field's error as soon as the person edits it
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const errors = {};

    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.date) errors.date = "Date is required.";
    if (!form.start_time) errors.start_time = "Start time is required.";
    if (!form.end_time) errors.end_time = "End time is required.";

    if (form.start_time && form.end_time && form.end_time <= form.start_time) {
      errors.end_time = "End time must be after start time.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim() || null,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
    });
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="appointment-form-title">
          {isEditing ? "Edit appointment" : "Add appointment"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Client call"
              aria-invalid={Boolean(fieldErrors.title)}
              aria-describedby={fieldErrors.title ? "title-error" : undefined}
              autoFocus
            />
            {fieldErrors.title && (
              <span className="field-error" id="title-error" role="alert">
                {fieldErrors.title}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add any extra details"
              rows={3}
            />
          </div>

          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleChange("date", e.target.value)}
              aria-invalid={Boolean(fieldErrors.date)}
              aria-describedby={fieldErrors.date ? "date-error" : undefined}
            />
            {fieldErrors.date && (
              <span className="field-error" id="date-error" role="alert">
                {fieldErrors.date}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="start_time">Start time</label>
              <input
                id="start_time"
                type="time"
                value={form.start_time}
                onChange={(e) => handleChange("start_time", e.target.value)}
                aria-invalid={Boolean(fieldErrors.start_time)}
                aria-describedby={
                  fieldErrors.start_time ? "start_time-error" : undefined
                }
              />
              {fieldErrors.start_time && (
                <span className="field-error" id="start_time-error" role="alert">
                  {fieldErrors.start_time}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="end_time">End time</label>
              <input
                id="end_time"
                type="time"
                value={form.end_time}
                onChange={(e) => handleChange("end_time", e.target.value)}
                aria-invalid={Boolean(fieldErrors.end_time)}
                aria-describedby={
                  fieldErrors.end_time ? "end_time-error" : undefined
                }
              />
              {fieldErrors.end_time && (
                <span className="field-error" id="end_time-error" role="alert">
                  {fieldErrors.end_time}
                </span>
              )}
            </div>
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Add appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
