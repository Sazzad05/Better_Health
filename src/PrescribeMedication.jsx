import React, { useState } from "react";

const medicineSuggestions = [
  "Paracetamol",
  "Amoxicillin",
  "Omeprazole",
  "Ibuprofen",
  "Metformin",
  "Azithromycin",
  "Ciprofloxacin",
  "Cetirizine",
];

const durationUnits = ["days", "weeks", "months"];

export default function PrescribeMedication({ medicationPlan, setMedicationPlan }) {
  const [medicineName, setMedicineName] = useState("");
  const [timing, setTiming] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState(durationUnits[0]);
  const [editIndex, setEditIndex] = useState(null);

  const resetForm = () => {
    setMedicineName("");
    setTiming("");
    setDescription("");
    setDuration("");
    setDurationUnit(durationUnits[0]);
    setEditIndex(null);
  };

  const addToMedicationPlan = () => {
    if (!medicineName || !timing) {
      alert("Please fill in medicine name and timing.");
      return;
    }
    if (duration && isNaN(duration)) {
      alert("Duration must be a number.");
      return;
    }

    const newEntry = {
      medicine: medicineName,
      timing,
      description,
      duration: duration ? Number(duration) : null,
      durationUnit: duration ? durationUnit : null,
    };

    if (editIndex !== null) {
      const updated = [...medicationPlan];
      updated[editIndex] = newEntry;
      setMedicationPlan(updated);
    } else {
      setMedicationPlan([...medicationPlan, newEntry]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const entry = medicationPlan[index];
    setMedicineName(entry.medicine);
    setTiming(entry.timing);
    setDescription(entry.description || "");
    setDuration(entry.duration !== null ? entry.duration.toString() : "");
    setDurationUnit(entry.durationUnit || durationUnits[0]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = medicationPlan.filter((_, i) => i !== index);
    setMedicationPlan(updated);
    resetForm();
  };

  return (
    <section style={{ padding: 20, marginTop: 20 }}>
      <h2>Prescribe Medication</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 15,
        }}
      >
        <input
          type="text"
          placeholder="Medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          list="medicine-suggestions"
          style={{ padding: 5 }}
        />
        <datalist id="medicine-suggestions">
          {medicineSuggestions.map((med) => (
            <option key={med} value={med} />
          ))}
        </datalist>

        <input
          type="text"
          placeholder="e.g. 1+0+1"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          style={{ padding: 5, width: 80 }}
        />

          <input
          type="number"
          min="1"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ padding: 5, width: 60 }}
        />
        <select
          value={durationUnit}
          onChange={(e) => setDurationUnit(e.target.value)}
          style={{ padding: 5 }}
        >
          {durationUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 5, width: 200 }}
        />

        

        <button
          onClick={addToMedicationPlan}
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "+ Add"}
        </button>
      </div>

      {medicationPlan.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Medication List</h3>
          {medicationPlan.map((med, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: 10,
                paddingBottom: 10,
              }}
            >
              <strong>{med.medicine}</strong>
              {med.duration && med.durationUnit && (
                <span>
                  {" "}
                  | {med.duration} {med.durationUnit} | {" "}
                </span>
              )}
                 {med.timing}
              
              {med.description && <span>: {" | "}{med.description}</span>}
              

              <br />
              <button
                onClick={() => handleEdit(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#fffb00ff",
                  color: "black",
                  border: "none",
                  marginRight: 10,
                  marginTop: 5,
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  marginTop: 5,
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
