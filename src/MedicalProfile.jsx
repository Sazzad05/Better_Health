import React, { useEffect, useState } from "react";

const url =
  "https://script.google.com/macros/s/AKfycbxeKiP7lI4_ht6xmkvcZqgdawMmjgQ0lKTB_rAiEwIJ_lEYOPcZe1Sy95B-LQXkVL3U/exec";

export default function MedicalProfile({ data, setData }) {
  const [commonDiseases, setCommonDiseases] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((raw) => {
        if (!Array.isArray(raw)) {
          console.error("Expected an array, got:", raw);
          return;
        }

        const uniqueDiseases = [...new Set(raw.map((row) => row.Disease?.trim()))]
          .filter(Boolean)
          .sort();

        setCommonDiseases(uniqueDiseases);
      })
      .catch((err) => console.error("Error fetching diseases:", err));
  }, []);

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
          {commonDiseases.length === 0 ? (
            <p>Loading diseases...</p>
          ) : (
            commonDiseases.map((disease) => (
              <label key={disease} style={{ width: "200px" }}>
                <input
                  type="checkbox"
                  value={disease}
                  checked={(data.existingDiseases || []).includes(disease)}
                  onChange={handleCheckboxChange}
                />{" "}
                {disease}
              </label>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
