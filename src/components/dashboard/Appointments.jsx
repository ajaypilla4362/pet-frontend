import { useEffect, useState } from "react";
import "./Appointments.css";

function Appointments({ user }) {
  const [pets, setPets] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    petId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    fees: 500
  });

  // ================= FETCH PETS (USER ONLY) =================
  useEffect(() => {
    if (user.role === "USER") {
      fetch(`http://localhost:8080/api/pets/${user.id}`)
        .then(res => res.json())
        .then(data => setPets(data))
        .catch(() => setPets([]));
    }
  }, [user]);

  // ================= FETCH DOCTORS (USER ONLY) =================
  useEffect(() => {
    if (user.role === "USER") {
      fetch("http://localhost:8080/api/users/doctors")
        .then(res => res.json())
        .then(data => setDoctors(data))
        .catch(() => setDoctors([]));
    }
  }, [user]);

  // ================= FETCH APPOINTMENTS =================
  const loadAppointments = () => {
    const url =
      user.role === "USER"
        ? `http://localhost:8080/api/appointments/user/${user.id}`
        : `http://localhost:8080/api/appointments/doctor/${user.id}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(() => setAppointments([]));
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  // ================= FORM HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= BOOK APPOINTMENT (USER) =================
  const bookAppointment = () => {
    if (
      !form.petId ||
      !form.doctorId ||
      !form.appointmentDate ||
      !form.appointmentTime
    ) {
      alert("Please fill all fields");
      return;
    }

    fetch(`http://localhost:8080/api/appointments/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        alert("Appointment booked");
        loadAppointments();
      });
  };

  // ================= DOCTOR ACTIONS =================
  const approveAppointment = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/approve`, {
      method: "PUT"
    }).then(() => loadAppointments());
  };

  const rejectAppointment = (id) => {
    fetch(`http://localhost:8080/api/appointments/${id}/reject`, {
      method: "PUT"
    }).then(() => loadAppointments());
  };

  return (
    <div className="appointments-container">

      {/* ================= USER VIEW ================= */}
      {user.role === "USER" && (
        <>
          <div className="book-card">
            <h2>Book Appointment</h2>

            <select name="petId" onChange={handleChange}>
              <option value="">Select Pet</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>
                  {p.petName} ({p.petType})
                </option>
              ))}
            </select>

            <select name="doctorId" onChange={handleChange}>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input type="date" name="appointmentDate" onChange={handleChange} />
            <input type="time" name="appointmentTime" onChange={handleChange} />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
            />

            <button onClick={bookAppointment}>Confirm Booking</button>
          </div>

          <h3>My Appointments</h3>
        </>
      )}

      {/* ================= DOCTOR VIEW ================= */}
      {user.role === "DOCTOR" && (
        <h2>Incoming Appointments</h2>
      )}

      {/* ================= APPOINTMENTS LIST ================= */}
      <div className="appointments-list">
        {appointments.length === 0 && <p>No appointments</p>}

        {appointments.map(a => (
          <div key={a.id} className="appointment-card">
            <p><b>Pet:</b> {a.petName}</p>
            <p><b>Date:</b> {a.appointmentDate}</p>
            <p><b>Time:</b> {a.appointmentTime}</p>
            <p><b>Status:</b> {a.status}</p>

            {user.role === "USER" && (
              <p><b>Doctor:</b> {a.doctorName}</p>
            )}

            {user.role === "DOCTOR" && a.status === "PENDING" && (
              <div className="doctor-actions">
                <button
                  className="approve"
                  onClick={() => approveAppointment(a.id)}
                >
                  Approve
                </button>
                <button
                  className="reject"
                  onClick={() => rejectAppointment(a.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Appointments;
