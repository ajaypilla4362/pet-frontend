import "./MyPets.css";

function MyPets({ pets, onAddPet }) {
  return (
    <div className="mypets-container">
      {/* Header */}
      <div className="mypets-header">
        <div>
          <h2>Pet Profiles</h2>
          <p>Manage your pets information</p>
        </div>

        <button className="add-btn" onClick={onAddPet}>
          + Add New Pet
        </button>
      </div>

      {/* Pets Grid */}
      <div className="pets-grid">
        {pets.length === 0 && (
          <p className="empty">No pets added yet</p>
        )}

        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <h3>{pet.petName}</h3>
            <p><strong>Type:</strong> {pet.petType}</p>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Height:</strong> {pet.height} cm</p>
            <p><strong>Weight:</strong> {pet.weight} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
