// This is the base URL of our FastAPI backend
const BASE_URL = "http://localhost:8000/appointments";

// Helper function: checks if the response is ok,
// otherwise reads the error message sent by the backend
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.detail || "Something went wrong. Please try again.";
    throw new Error(message);
  }
  return response.json();
}

// GET all appointments (with optional date/status filters)
export async function getAppointments(date, status) {
  let url = BASE_URL + "/";

  // add filters to the URL only if they were provided
  if (date || status) {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (status) params.append("status", status);
    url += "?" + params.toString();
  }

  const response = await fetch(url);
  return handleResponse(response);
}

// // GET a single appointment by its id
// export async function getAppointment(id) {
//   const response = await fetch(`${BASE_URL}/${id}`);
//   return handleResponse(response);
// }

// POST - create a new appointment
export async function createAppointment(appointmentData) {
  const response = await fetch(BASE_URL + "/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return handleResponse(response);
}

// PUT - update an existing appointment
export async function updateAppointment(id, appointmentData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return handleResponse(response);
}

// PATCH - mark an appointment as completed
export async function completeAppointment(id) {
  const response = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PATCH",
  });
  return handleResponse(response);
}

// PATCH - cancel an appointment
export async function cancelAppointment(id) {
  const response = await fetch(`${BASE_URL}/${id}/cancel`, {
    method: "PATCH",
  });
  return handleResponse(response);
}