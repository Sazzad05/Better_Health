import React, { useEffect, useState } from "react";

const url =
  "https://script.google.com/macros/s/AKfycbxeKiP7lI4_ht6xmkvcZqgdawMmjgQ0lKTB_rAiEwIJ_lEYOPcZe1Sy95B-LQXkVL3U/exec";

export default function DiseaseBasedFoodSuggestions({ existingDiseases = [] }) {
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Expected an array, got:", data);
          return;
        }

        const transformed = data.map((row) => {
          const eat = [];
          const avoid = [];

          for (let i = 1; i <= 5; i++) {
            const eatFood = row[`Foods to Eat - ${i}`];
            if (eatFood) eat.push(eatFood.trim());
          }

          for (let i = 1; i <= 5; i++) {
            const avoidFood = row[`Foods to avoid - ${i}`];
            if (avoidFood) avoid.push(avoidFood.trim());
          }

          return {
            disease: row.Disease.trim(),
            include: eat,
            avoid: avoid,
          };
        });

        setDietData(transformed);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (existingDiseases.length === 0) {
    return <section></section>;
  }

  const allInclude = new Set();
  const allAvoid = new Set();

  existingDiseases.forEach((disease) => {
    const entry = dietData.find((d) => d.disease === disease);
    if (entry) {
      entry.include.forEach((item) => allInclude.add(item));
      entry.avoid.forEach((item) => allAvoid.add(item));
    }
  });

  const finalAvoid = [...allAvoid];
  const finalInclude = [...allInclude].filter((item) => !allAvoid.has(item));

  return (
    <section>
      <h3>Disease-Based Food Suggestions</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingTop: 10,
        }}
      >
        <div style={{ flex: 1, marginRight: 20 }}>
          <div style={{ marginBottom: 30 }}>
            <h4>✅ Foods to Include</h4>
            {finalInclude.length > 0 ? (
              <ul>
                {finalInclude.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#888" }}>
                No safe food recommendations available.
              </p>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 30 }}>
            <h4>❌ Foods to Avoid</h4>
            {finalAvoid.length > 0 ? (
              <ul>
                {finalAvoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#888" }}>No foods to avoid listed.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
