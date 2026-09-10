import { useEffect, useState } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  completeAppointment,
  cancelAppointment,
} from "../api/appointments";
import AppointmentCard from "./AppointmentCard";
import AppointmentForm from "./AppointmentForm";
import FilterBar from "./FilterBar";
import Toast from "./Toast";

function AppointmentBoard() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // null = form closed. "new" = adding. an appointment object = editing.
  const [formTarget, setFormTarget] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, statusFilter]);

  // auto-dismiss the toast after a few seconds
  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => setToast({ message: "", type: "success" }), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function loadAppointments() {
    setIsLoading(true);
    try {
      const data = await getAppointments(dateFilter, statusFilter);
      setAppointments(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(message, type) {
    setToast({ message, type });
  }

  function handleClearFilters() {
    setDateFilter("");
    setStatusFilter("");
  }

  async function handleFormSubmit(data) {
    setIsSaving(true);
    try {
      if (formTarget === "new") {
        await createAppointment(data);
        showToast("Appointment added.", "success");
      } else {
        await updateAppointment(formTarget.id, data);
        showToast("Appointment updated.", "success");
      }
      setFormTarget(null);
      await loadAppointments();
    } catch (err) {
      // keep the form open so the person can fix the conflict/validation issue
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleComplete(id) {
    try {
      await completeAppointment(id);
      showToast("Appointment marked as completed.", "success");
      await loadAppointments();
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  async function handleCancel(id) {
    try {
      await cancelAppointment(id);
      showToast("Appointment cancelled.", "success");
      await loadAppointments();
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  return (
    <div className="board">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <div className="board__toolbar">
        <FilterBar
          date={dateFilter}
          status={statusFilter}
          onDateChange={setDateFilter}
          onStatusChange={setStatusFilter}
          onClear={handleClearFilters}
        />

        <button className="btn btn--primary" onClick={() => setFormTarget("new")}>
          + Add appointment
        </button>
      </div>

      {isLoading && <p className="board__state">Loading appointments...</p>}

      {!isLoading && appointments.length === 0 && (
        <p className="board__state">
          No appointments match these filters yet.
        </p>
      )}

      {!isLoading && appointments.length > 0 && (
        <div className="board__list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onEdit={setFormTarget}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}

      {formTarget && (
        <AppointmentForm
          initialData={formTarget === "new" ? null : formTarget}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormTarget(null)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

export default AppointmentBoard;
