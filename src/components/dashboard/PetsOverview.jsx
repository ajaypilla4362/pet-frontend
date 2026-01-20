import "./PetsOverview.css";

function PetsOverview({ pets }) {
  return (
    <div className="pets-overview">
      <div className="pets-header">
        <h3>Your Pets</h3>
        <span className="view-all">View All</span>
      </div>

      {pets.length === 0 && <p>No pets added yet</p>}

      {pets.map((pet) => (
        <div className="pet-card" key={pet.id}>
          {/* Left */}
          <div className="pet-info">
            <img
              src="/pet-avatar.png"   // demo image (you can change later)
              alt={pet.petName}
              className="pet-avatar"
            />

            <div>
              <h4>{pet.petName}</h4>
              <p className="breed">
                {pet.petType} • {pet.age} years
              </p>
            </div>
          </div>

          {/* Status */}
          <span className="pet-status healthy">Healthy</span>

          {/* Stats */}
          <div className="pet-stats">
            <div>
              ❤️
              <span>{pet.weight} kg</span>
              <small>Weight</small>
            </div>

            <div>
              📏
              <span>{pet.height} cm</span>
              <small>Height</small>
            </div>

            <div>
              🎂
              <span>{pet.age}</span>
              <small>Age</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetsOverview;
