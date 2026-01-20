function SummaryCards({ totalPets }) {
  return (
    <div className="summary-cards">
      <div className="card orange">
        <h4>Total Pets</h4>
        <h2>{totalPets}</h2>
        <p>↑ based on your pets</p>
      </div>

      <div className="card white">
        <h4>Appointments</h4>
        <h2>5</h2>
      </div>

      <div className="card green">
        <h4>Health Score</h4>
        <h2>92%</h2>
      </div>

      <div className="card white">
        <h4>Orders</h4>
        <h2>12</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
