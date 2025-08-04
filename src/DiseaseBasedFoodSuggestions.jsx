import React, { useEffect, useState } from "react";

const sheet = "SuggestedFood";
const url = `https://script.google.com/macros/s/AKfycbxeKiP7lI4_ht6xmkvcZqgdawMmjgQ0lKTB_rAiEwIJ_lEYOPcZe1Sy95B-LQXkVL3U/exec?sheet=${sheet}`;

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
          const colNo = 2;
          for (let i = 1; i <= colNo; i++) {
            const eatVal = row[`Foods to Eat - ${i}`];
            const avoidVal = row[`Foods to avoid - ${i}`];

            if (eatVal) {
              eat.push(...eatVal.split(",").map((item) => item.trim()).filter(Boolean));
            }
            if (avoidVal) {
              avoid.push(...avoidVal.split(",").map((item) => item.trim()).filter(Boolean));
            }
          }

          // fallback for consolidated fields
          if (row["Foods to Eat"]) {
            eat.push(...row["Foods to Eat"].split(",").map((item) => item.trim()).filter(Boolean));
          }
          if (row["Foods to avoid"]) {
            avoid.push(...row["Foods to avoid"].split(",").map((item) => item.trim()).filter(Boolean));
          }

          return {
            disease: row.Disease?.trim() || "",
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
    const entry = dietData.find((d) => d.disease.toLowerCase() === disease.toLowerCase());
    if (entry) {
      entry.include.forEach((item) => allInclude.add(item));
      entry.avoid.forEach((item) => allAvoid.add(item));
    }
  });

  // Remove any item that exists in avoid from include
  const finalAvoid = [...allAvoid];
  const finalInclude = [...allInclude].filter((item) => !allAvoid.has(item));

  return (
    <section>
      <h3>🥗 রোগ-ভিত্তিক খাদ্য নির্বাচন</h3>
      <div
        style={{
          // display: "flex",
          // justifyContent: "space-between",
          // alignItems: "flex-start",
          paddingTop: 5,
        }}
      >
        
        {/* Include Paragraph */}
        <div style={{ flex: 1, marginBottom: 5 }}>
          <h4>✅ খাওয়া যাবে</h4>
          {finalInclude.length > 0 ? (
            <p>{finalInclude.join(", ")}</p>
          ) : (
            <p style={{ color: "#888" }}>No safe food recommendations available.</p>
          )}
        </div>

        {/* Avoid Paragraph */}
        <div style={{ flex: 1, marginBottom: 10 }}>
          <h4>❌ খাওয়া যাবে না</h4>
          {finalAvoid.length > 0 ? (
            <p>{finalAvoid.join(", ")}</p>
          ) : (
            <p style={{ color: "#888" }}>No foods to avoid listed.</p>
          )}
        </div>
      </div>
    </section>
  );
}
