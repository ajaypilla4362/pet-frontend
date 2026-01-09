import { useEffect, useState } from "react";
import "./MyPets.css";

function MyPets({ userId, onAddPet }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/${userId}`)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch(() => setPets([]));
  }, [userId]);

  return (
    <div className="mypets-container">
      <div className="mypets-header">
        <div>
          <h2>Pet Profiles</h2>
          <p>Manage your pets information</p>
        </div>
        <button className="add-btn" onClick={onAddPet}>
          + Add New Pet
        </button>
      </div>

      <div className="pets-grid">
        {pets.length === 0 && (
          <p className="empty">No pets added yet</p>
        )}

        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <h3>{pet.petName}</h3>
            <p>Type: {pet.petType}</p>
            <p>Name: {pet.petName}</p>
            <p>Age: {pet.age} years</p>
            <p>Height: {pet.height} cm</p>
            <p>Weight: {pet.weight} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
