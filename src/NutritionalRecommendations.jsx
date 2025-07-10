import React from "react";

export default function NutritionalRecommendations({ personalDetails, medicalProfile }) {
  // Could tailor recommendations based on inputs; here is a simple static example

  return (
    <section style={{ marginBottom: 40 }}>
      <h2>Nutritional Recommendations</h2>

      <h4>Foods to Avoid</h4>
      <ul>
        <li>Processed foods</li>
        <li>High sugar snacks</li>
        <li>Excessive saturated fats</li>
      </ul>

      <h4>Foods to Include</h4>
      <ul>
        <li>Vegetables and fruits</li>
        <li>Whole grains</li>
        <li>Lean proteins</li>
        <li>Healthy fats (nuts, olive oil)</li>
      </ul>

      <h4>Recommended Supplements</h4>
      <ul>
        <li>Multivitamins</li>
        <li>Omega-3 fatty acids</li>
        <li>Vitamin D (if deficient)</li>
      </ul>

      <h4>Personalized Macro/Micronutrient Breakdown</h4>
      <p>Calculation can be added based on activity level, goals, and body metrics.</p>
    </section>
  );
}
