import AppointmentBoard from "./components/AppointmentBoard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Appointment Board</h1>
        <p>View, schedule, and manage your team's appointments.</p>
      </header>

      <main>
        <AppointmentBoard />
      </main>
    </div>
  );
}

export default App;
