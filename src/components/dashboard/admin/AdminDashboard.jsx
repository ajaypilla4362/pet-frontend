function AdminDashboard({ user }) {
  return (
    <div>
      <h1>Welcome Admin {user.name} 👋</h1>
      <p>Admin Dashboard</p>

      <ul>
        <li>Total Users</li>
        <li>Total Doctors</li>
        <li>Total Pets</li>
        <li>Revenue</li>
        <li>Create Doctor</li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
