import React from "react";

// Disease-based food recommendations
const diseaseFoodMap = {
  Diabetes: {
    include: ["Leafy greens", "Whole grains", "Beans", "Nuts", "Cinnamon","Salt"],
    avoid: ["Sugar", "White bread", "Sugary drinks", "Pastries"],
  },
  Hypertension: {
    include: ["Bananas", "Leafy greens", "Beets", "Oats"],
    avoid: ["Salt", "Pickles", "Processed meats", "Canned soups"],
  },
  "High Cholesterol": {
    include: ["Oats", "Nuts", "Fatty fish", "Fruits"],
    avoid: ["Fried foods", "Butter", "Red meat"],
  },
  "Thyroid Issues": {
    include: ["Seaweed", "Dairy", "Eggs"],
    avoid: ["Soy", "Gluten", "Cruciferous vegetables"],
  },
  "Heart Disease": {
    include: ["Whole grains", "Fruits", "Fish", "Nuts"],
    avoid: ["Trans fats", "Salt", "Processed meats"],
  },
  "Kidney Disease": {
    include: ["Apples", "Cauliflower", "Rice", "Cabbage"],
    avoid: ["Bananas", "Dairy", "High potassium foods"],
  },
  "Gastric/Ulcer": {
    include: ["Bananas", "Oatmeal", "Cabbage juice"],
    avoid: ["Spicy food", "Caffeine", "Carbonated drinks"],
  },
  Asthma: {
    include: ["Apples", "Carrots", "Spinach", "Magnesium-rich foods"],
    avoid: ["Dairy", "Preservatives", "Sulfites"],
  },
  PCOS: {
    include: ["Low GI foods", "Leafy greens", "Lean proteins"],
    avoid: ["Sugar", "Refined carbs", "Processed snacks"],
  },
  Anemia: {
    include: ["Red meat", "Leafy greens", "Iron-rich cereals"],
    avoid: ["Tea (during meals)", "Dairy (in excess)"],
  },
  Arthritis: {
    include: ["Fatty fish", "Olive oil", "Broccoli"],
    avoid: ["Fried foods", "Sugar", "Refined carbs"],
  },
  Obesity: {
    include: ["Fruits", "Vegetables", "Lean proteins", "Whole grains"],
    avoid: ["Fast food", "Sugary drinks", "Processed snacks"],
  },
};

export default function DiseaseBasedFoodSuggestions({ existingDiseases = [] }) {
  if (existingDiseases.length === 0) {
    return (
      <section>
        {/* <h2>Disease-Based Food Suggestions</h2> */}
        {/* <p>No diseases selected.</p> */}
      </section>
    );
  }

  // Collect all foods across selected diseases
  const allInclude = new Set();
  const allAvoid = new Set();

  existingDiseases.forEach((disease) => {
    const rec = diseaseFoodMap[disease];
    if (rec) {
      rec.include.forEach((item) => allInclude.add(item));
      rec.avoid.forEach((item) => allAvoid.add(item));
    }
  });

  // Final food lists:
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
                <p style={{ color: "#888" }}>No safe food recommendations available.</p>
              )}
             {/* <hr style={{ margin: "20px 0" }} /> */}
            </div>
            </div>
            <div style={{ flex: 1}}>
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
              {/* <hr style={{ margin: "20px 0" }} /> */}
            </div>
          </div>
        </div>
 





      

      
    </section>
  );
}
