import React from "react";

// List of common diseases
const commonDiseases = [
  "Diabetes",
  "Hypertension",
  "High Cholesterol",
  "Thyroid Issues",
  "Heart Disease",
  "Kidney Disease",
  "Gastric/Ulcer",
  "Asthma",
  "PCOS",
  "Anemia",
  "Arthritis",
  "Obesity",
  "Other",
];

export default function MedicalProfile({ data, setData }) {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const updatedDiseases = checked
      ? [...(data.existingDiseases || []), value]
      : (data.existingDiseases || []).filter((d) => d !== value);

    setData({ ...data, existingDiseases: updatedDiseases });
  };

  return (
    <section className="left-box">
      <h2>Medical Profile</h2>

      {/* Existing Diseases with Checkboxes */}
      <div style={{ marginBottom: 15 }}>
        <strong>Existing Diseases:</strong>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: 10,
          }}
        >
          {commonDiseases.map((disease) => (
            <label key={disease} style={{ width: "200px" }}>
              <input
                type="checkbox"
                value={disease}
                checked={(data.existingDiseases || []).includes(disease)}
                onChange={handleCheckboxChange}
              />{" "}
              {disease}
            </label>
          ))}
        </div>
      </div>

      {/* Current Symptoms */}
      {/* <label>
        Current Symptoms:
        <textarea
          value={data.currentSymptoms || ""}
          onChange={(e) =>
            setData({ ...data, currentSymptoms: e.target.value })
          }
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
          placeholder="Describe current symptoms..."
        />
      </label>

      <br />
      <br /> */}

      {/* Medications */}
      {/* <label>
        Medications:
        <textarea
          value={data.medications || ""}
          onChange={(e) =>
            setData({ ...data, medications: e.target.value })
          }
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
          placeholder="List any ongoing medications..."
        />
      </label>

      <br />
      <br /> */}

      {/* Allergies */}
      {/* <label>
        Allergies:
        <textarea
          value={data.allergies || ""}
          onChange={(e) =>
            setData({ ...data, allergies: e.target.value })
          }
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
          placeholder="Mention food/medicine allergies if any..."
        />
      </label>

      <br />
      <br /> */}

      {/* Family Medical History */}
      {/* <label>
        Family Medical History:
        <textarea
          value={data.familyMedicalHistory || ""}
          onChange={(e) =>
            setData({ ...data, familyMedicalHistory: e.target.value })
          }
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
          placeholder="E.g., diabetes in parents, hypertension, etc."
        />
      </label> */}
    </section>
  );
}
