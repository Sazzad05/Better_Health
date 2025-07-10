import React, { useState } from "react";

export default function Prescription() {
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", notes: "" },
  ]);

  const updateMedicine = (index, field, value) => {
    setMedicines((prev) => {
      const newMedicines = [...prev];
      newMedicines[index][field] = value;
      return newMedicines;
    });
  };

  const addMedicine = () => {
    setMedicines((prev) => [...prev, { name: "", dosage: "", frequency: "", notes: "" }]);
  };

  const removeMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="prescription-container" style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Prescription</h2>
      {medicines.map((med, index) => (
        <div key={index} style={{ marginBottom: 15, padding: 10, borderBottom: "1px solid #eee" }}>
          <label>
            Medicine Name:
            <input
              type="text"
              value={med.name}
              onChange={(e) => updateMedicine(index, "name", e.target.value)}
              placeholder="e.g., Paracetamol"
              style={{ marginLeft: 10, padding: 5, width: "60%" }}
            />
          </label>
          <br />
          <label>
            Dosage:
            <input
              type="text"
              value={med.dosage}
              onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
              placeholder="e.g., 500mg"
              style={{ marginLeft: 10, padding: 5, width: "30%" }}
            />
          </label>
          <br />
          <label>
            Frequency:
            <input
              type="text"
              value={med.frequency}
              onChange={(e) => updateMedicine(index, "frequency", e.target.value)}
              placeholder="e.g., Twice a day"
              style={{ marginLeft: 10, padding: 5, width: "40%" }}
            />
          </label>
          <br />
          <label>
            Notes:
            <input
              type="text"
              value={med.notes}
              onChange={(e) => updateMedicine(index, "notes", e.target.value)}
              placeholder="Any special instructions"
              style={{ marginLeft: 10, padding: 5, width: "80%" }}
            />
          </label>
          <br />
          {medicines.length > 1 && (
            <button
              onClick={() => removeMedicine(index)}
              style={{ marginTop: 8, backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addMedicine}
        style={{ backgroundColor: "#2ecc71", color: "white", border: "none", padding: "10px 15px", cursor: "pointer", marginTop: 10 }}
        type="button"
      >
        + Add Medicine
      </button>
    </section>
  );
}
