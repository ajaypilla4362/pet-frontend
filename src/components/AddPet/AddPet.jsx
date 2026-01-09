import { useState } from "react";
import "./AddPet.css";

function AddPet({ userId, onPetAdded, onCancel }) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    if (!userId) {
      setError("User not found. Please login again.");
      return;
    }

    const petData = {
      petName,
      petType,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/pets/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(petData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add pet");
      }

      const savedPet = await response.json();
      console.log("Pet added:", savedPet);

      // reset form
      setPetName("");
      setPetType("");
      setAge("");
      setHeight("");
      setWeight("");
      setError("");

      // notify parent (Dashboard / MyPets)
      if (onPetAdded) {
        onPetAdded();
      }

    } catch (err) {
      console.error(err);
      setError("Unable to add pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-container">
      <h2>Add Pet</h2>
      <p className="subtitle">Enter your pet details</p>

      {error && <p className="error">{error}</p>}

      <form className="add-pet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pet Type (Dog, Cat...)"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <button type="submit">Save Pet</button>

        {onCancel && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default AddPet;
