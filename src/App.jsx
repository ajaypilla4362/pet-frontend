import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    console.log("LOGIN SUCCESS:", userData); // 🔴 DEBUG LINE
    setUser(userData);
    setPage("dashboard");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          goToRegister={() => setPage("register")}
        />
      )}

      {page === "register" && (
        <Register goToLogin={() => setPage("login")} />
      )}

      {page === "dashboard" && user && (
        <Dashboard user={user} />
      )}
    </>
  );
}

export default App;
