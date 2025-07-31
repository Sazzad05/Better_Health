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

  const bmiColor = (bmi) => {
    if (!bmi) return "black";
    const val = parseFloat(bmi);
    return val >= 18.5 && val < 25 ? "green" : "red";
  };

  // BMR calculation
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

  const bodyFatColor = (bf) => {
    if (!bf) return "black";
    const val = parseFloat(bf);
    if (gender === "male") {
      return val >= 6 && val < 18 ? "green" : "red";
    } else {
      return val >= 14 && val < 25 ? "green" : "red";
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

  const whrColor = (ratio) => {
    if (!ratio) return "black";
    const val = parseFloat(ratio);
    if (gender === "male") {
      return val < 0.9 ? "green" : "red";
    } else {
      return val < 0.8 ? "green" : "red";
    }
  };

  // TDEE
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

  const tdee = bmr
    ? (bmr * activityMultipliers[activityLevel || "sedentary"]).toFixed(0)
    : null;

  // Protein Calculation
  const proteinLow = weight ? (weight * 0.8).toFixed(1) : null;
  const proteinHigh = weight ? (weight * 2.0).toFixed(1) : null;

  // Fat Calculation
  const fatLow = tdee ? (tdee * 0.2 / 9).toFixed(1) : null;
  const fatHigh = tdee ? (tdee * 0.35 / 9).toFixed(1) : null;

  // Carbohydrate Calculation
  const carbLow = tdee ? (tdee * 0.45 / 4).toFixed(1) : null;
  const carbHigh = tdee ? (tdee * 0.65 / 4).toFixed(1) : null;

  return (
    <section className="left-box">
      <p>
        <strong>BMI:</strong> {bmi || "--"}
        <br />
        <em style={{ color: bmiColor(bmi) }} className="calculationInterpretations">
          {getBmiCategory(bmi)}<br />
          {bmi ? <>Ideal BMI: 18.5 – 24.9</> : "--"}
          {heightInCm ? (
            <span style={{ display: "block" }}>
              Ideal weight: {Math.round(18.5 * (heightInCm / 100) ** 2)}kg –{" "}
              {Math.round(24.9 * (heightInCm / 100) ** 2)}kg
            </span>
          ) : null}
        </em>
      </p>

      <p>
        <strong>BMR:</strong> {bmr ? `${Math.round(bmr)} kcal/day` : "--"}
        <br />
        <em className="calculationInterpretations">{getBmrInterpretation(bmr)}</em>
      </p>

      <p>
        <strong>TDEE:</strong> {tdee ? `${tdee} kcal/day` : "--"}
        <br />
        <em className="calculationInterpretations">
          {activityLabel[activityLevel] || "Unknown activity level"}
        </em>
      </p>

      <p>
        <strong>Body Fat %:</strong> {bodyFat || "--"}
        <br />
        <em style={{ color: bodyFatColor(bodyFat) }} className="calculationInterpretations">
          {bodyFat && getBodyFatCategory(bodyFat)}
        </em>
      </p>

      <p>
        <strong>Waist-to-Hip Ratio:</strong> {waistHipRatio || "--"}
        <br />
        <em style={{ color: whrColor(waistHipRatio) }} className="calculationInterpretations">
          {waistHipRatio && getWhRatioCategory(waistHipRatio)}
        </em>
      </p>

      {/* Summary Table */}
      {/* {(tdee && proteinLow && proteinHigh && fatLow && fatHigh && carbLow && carbHigh) && ( */}
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ marginBottom: "10px" }}>Macronutrient Summary</h4>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "rgba(139, 15, 71, 1)",color:"white" }}>
                <th style={{ padding: "8px", border: "1px solid rgba(139, 15, 71, 1)" }}>Metric / Day</th>
                <th style={{ padding: "8px", border: "1px solid rgba(139, 15, 71, 1)" }}>Value / Day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  Total Calorie Needs
                </td>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  {tdee} kcal
                </td>
              </tr>
              <tr>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  Protein Req
                </td>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  {proteinLow}g – {proteinHigh}g
                </td>
              </tr>
              <tr>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  Fat Req
                </td>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  {fatLow}g – {fatHigh}g
                </td>
              </tr>
              <tr>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  Carbohydrate Req
                </td>
                <td style={{ padding: "4px", border: "1px solid rgba(139, 15, 71, 1)" }}>
                  {carbLow}g – {carbHigh}g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      {/* )} */}
    </section>
  );
}
