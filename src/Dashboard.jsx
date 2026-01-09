import { useState } from "react";
import "./Dashboard.css";
import AddPet from "./components/AddPet/AddPet";
import MyPets from "./components/MyPets/MyPets";

function Dashboard({ user }) {
  // 🔴 IMPORTANT: Guard against page reload
  if (!user) {
    return (
      <h2 style={{ padding: "20px" }}>
        Please login again to continue
      </h2>
    );
  }

  const [active, setActive] = useState("My Pets");

  // Sidebar menu for USER
  let menuItems = [
    "Dashboard",
    "Appointment",
    "My Pets",
    "Hygienic Care",
    "Grooming",
    "Training",
    "Reports",
  ];

  if (user.role === "DOCTOR") {
    menuItems = ["Appointments", "Reports", "Profile"];
  }

  if (user.role === "ADMIN") {
    menuItems = ["Create Doctor", "Users", "Reports", "Settings"];
  }

  const initials = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="dashboard-container">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <h2 className="logo">Pet Care</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              <span className="icon">🐾</span>
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Welcome, {user.name} 👋</h1>
            <p>Role: {user.role}</p>
          </div>

          <div className="profile">
            <div className="avatar">{initials}</div>
            <div className="dropdown">
              <p>Edit Profile</p>
              <p>Logout</p>
            </div>
          </div>
        </header>

        {/* ===== Body ===== */}
        <section className="dashboard-body">

          {/* My Pets List */}
          {active === "My Pets" && (
            <MyPets
              userId={user.id}
              onAddPet={() => setActive("Add Pet")}
            />
          )}

          {/* Add Pet Form */}
          {active === "Add Pet" && (
            <AddPet
              userId={user.id}
              onPetAdded={() => setActive("My Pets")}
              onCancel={() => setActive("My Pets")}
            />
          )}

          {/* Default Hero */}
          {active !== "My Pets" && active !== "Add Pet" && (
            <div className="hero-box">
              <img
                src="/dashboard-bg.png"
                alt="Pets"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="overlay"></div>
              <div className="hero-text">
                WE TREAT YOUR PETS WITH CARE
              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default Dashboard;
