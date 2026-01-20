import UserDashboard from "./Dashboard"; // existing USER dashboard UI
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import Appointments from "./dashboard/admin/Appointments"; // doctor uses this

function Dashboard({ user }) {
  if (!user) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  // ✅ ROLE SWITCH (THIS WAS MISSING)
  if (user.role === "ADMIN") {
    return <AdminDashboard user={user} />;
  }

  if (user.role === "DOCTOR") {
    return <Appointments user={user} />;
  }

  // ✅ DEFAULT = USER
  return <UserDashboard user={user} />;
}

export default Dashboard;
