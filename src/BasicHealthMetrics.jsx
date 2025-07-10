import React from "react";

export default function BasicHealthMetrics({ personalDetails }) {
  const {
    age,
    gender,
    weight,
    heightUnit,
    heightCm,
    heightFeet,
    heightInches,
    bodyMeasurements,
    activityLevel,
  } = personalDetails;

  // Convert height to cm
  const heightInCm =
    heightUnit === "cm"
      ? Number(heightCm) || 0
      : (Number(heightFeet) || 0) * 30.48 + (Number(heightInches) || 0) * 2.54;

  // BMI calculation
  const bmi =
    heightInCm && weight
      ? (weight / ((heightInCm / 100) ** 2)).toFixed(1)
      : null;

  const getBmiCategory = (bmi) => {
    const val = parseFloat(bmi);
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal weight";
    if (val < 30) return "Overweight";
    return "Obese";
  };

  // Color for BMI interpretation (green if normal, red if not)
  const bmiColor = (bmi) => {
    if (!bmi) return "black";
    const val = parseFloat(bmi);
    return val >= 18.5 && val < 25 ? "green" : "red";
  };

  // BMR calculation using Mifflin-St Jeor
  const bmr =
    heightInCm && weight && age
      ? gender === "male"
        ? 10 * weight + 6.25 * heightInCm - 5 * age + 5
        : 10 * weight + 6.25 * heightInCm - 5 * age - 161
      : null;

  const getBmrInterpretation = (bmr) =>
    bmr ? `Approx ${Math.round(bmr)} calories/day at rest.` : "--";

  // Body Fat %
  const bodyFat =
    bmi && age
      ? gender === "male"
        ? (1.2 * bmi + 0.23 * age - 16.2).toFixed(1)
        : (1.2 * bmi + 0.23 * age - 5.4).toFixed(1)
      : null;

  const getBodyFatCategory = (bf) => {
    const val = parseFloat(bf);
    if (gender === "male") {
      if (val < 6) return "Essential fat (very low)";
      if (val < 14) return "Athletes";
      if (val < 18) return "Fitness";
      if (val < 25) return "Average";
      return "Obese";
    } else {
      if (val < 14) return "Essential fat (very low)";
      if (val < 21) return "Athletes";
      if (val < 25) return "Fitness";
      if (val < 32) return "Average";
      return "Obese";
    }
  };

  // Color for Body Fat % (green if fitness or better, red otherwise)
  const bodyFatColor = (bf) => {
    if (!bf) return "black";
    const val = parseFloat(bf);
    if (gender === "male") {
      if (val >= 6 && val < 18) return "green";
      return "red";
    } else {
      if (val >= 14 && val < 25) return "green";
      return "red";
    }
  };

  // Waist-to-Hip Ratio
  const waist = Number(bodyMeasurements.waist) || 0;
  const hips = Number(bodyMeasurements.hips) || 0;
  const waistHipRatio = hips ? (waist / hips).toFixed(2) : null;

  const getWhRatioCategory = (ratio) => {
    const val = parseFloat(ratio);
    if (gender === "male") {
      if (val < 0.9) return "Low risk";
      if (val <= 0.99) return "Moderate risk";
      return "High risk";
    } else {
      if (val < 0.8) return "Low risk";
      if (val <= 0.84) return "Moderate risk";
      return "High risk";
    }
  };

  // Color for Waist-to-Hip Ratio (green if low risk, red otherwise)
  const whrColor = (ratio) => {
    if (!ratio) return "black";
    const val = parseFloat(ratio);
    if (gender === "male") {
      return val < 0.9 ? "green" : "red";
    } else {
      return val < 0.8 ? "green" : "red";
    }
  };

  // TDEE (Total Daily Energy Expenditure)
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const activityLabel = {
    sedentary: "Sedentary (little or no exercise)",
    light: "Light (light exercise/sports 1-3 days/week)",
    moderate: "Moderate (moderate exercise/sports 3-5 days/week)",
    active: "Active (hard exercise/sports 6-7 days/week)",
    veryActive: "Very Active (very hard exercise & physical job)",
  };

  const tdee = bmr ? (bmr * activityMultipliers[activityLevel || "sedentary"]).toFixed(0) : null;

  return (
    <section className="left-box">
      {/* <h2>Basic Health Metrics</h2> */}

      <p>
        <strong>BMI:</strong> {bmi || "--"}
        <br />
        <em
          className="calculationInterpretations"
          style={{ color: bmiColor(bmi) }}
        >
          {bmi
            ? `(Ideal: 18.5 – 24.9) ${getBmiCategory(bmi)}`
            : "--"}
        </em>
      </p>
      <br />

      <p>
        <strong>BMR:</strong> {bmr ? `${Math.round(bmr)} kcal/day` : "--"}
        <br />
        <em className="calculationInterpretations">
          {getBmrInterpretation(bmr)}
        </em>
      </p>
      <br />

      <p>
        <strong>TDEE:</strong> {tdee ? `${tdee} kcal/day` : "--"}
        <br />
        <em className="calculationInterpretations">
          {activityLabel[activityLevel] || "Unknown activity level"}
        </em>
      </p>
      <br />

      <p>
        <strong>Body Fat %:</strong> {bodyFat || "--"}
        <br />
        <em
          className="calculationInterpretations"
          style={{ color: bodyFatColor(bodyFat) }}
        >
          {bodyFat && getBodyFatCategory(bodyFat)}
        </em>
      </p>
      <br />

      <p>
        <strong>Waist-to-Hip Ratio:</strong> {waistHipRatio || "--"}
        <br />
        <em
          className="calculationInterpretations"
          style={{ color: whrColor(waistHipRatio) }}
        >
          {waistHipRatio && getWhRatioCategory(waistHipRatio)}
        </em>
      </p>
    </section>
  );
}
