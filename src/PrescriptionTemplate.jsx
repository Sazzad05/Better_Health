import React from "react";
import BasicHealthMetrics from "./BasicHealthMetrics";
import DiseaseBasedFoodSuggestions from "./DiseaseBasedFoodSuggestions";

export default function PrescriptionTemplate({
  personalDetails,
  medicalProfile,
  clinicName,
  doctorName,
  doctordesignation,
  doctordegree1,
  doctordegree2,
  doctorCertification1,
  doctorCertification2,
  doctorPhone,
  doctorEmail,
  patientName,
  patientAge,
  patientGender,
  patientId,
  date,
  medications = [],
  notes,
  dietPlan = [],
}) {
  const {
    weight,
    heightUnit,
    heightCm,
    heightFeet,
    heightInches,
    bodyMeasurements,
    activityLevel,
    age,
    gender,
    patientPhone,
  } = personalDetails;

  const { existingDiseases = [] } = medicalProfile;

  const formattedHeight =
    heightUnit === "cm"
      ? `${heightCm} cm`
      : `${heightFeet} ft ${heightInches} in`;

  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const date = new Date();
    date.setHours(+hours, +minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="pad-container"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "10mm 5mm 10mm 5mm",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        color: "#000",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #999",
          paddingBottom: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1, marginRight: 20 }}>
            <h1 style={{ margin: 0 }}>{clinicName}</h1>
          </div>
          <div style={{ flex: 1, textAlign: "right", color: "#fff" }}>
            <strong>Date:</strong> {date} <br />
            <strong>Patient ID:</strong> {String(patientId).padStart(7, "0")}
          </div>
        </div>

        <div>
          <div style={{marginRight: 20 }}>
            <h3 style={{ margin: 0 }}>
              {doctorName},
              <br />
            </h3>
            <p style={{ margin: 0 }}>
              {doctordesignation}
              <br />
              {doctordegree1} | &ensp;
              {doctordegree2} <br />
              {doctorCertification1} | &ensp;
              {doctorCertification2} <br />
              {doctorPhone} | &ensp;
              {doctorEmail}
              
            </p>
          </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "3mm 0 3mm 5px",
                  backgroundColor:"#032e5b",
                  borderRadius:"10px",
                  color:"white",
                  marginTop:"5px 0 5px 0",
                }}
              >
                <div style={{ flex: "1 1 80mm "}}>
                  <strong>Name:</strong> {patientName || "N/A"}
                </div>
                <div style={{ flex: "1 1 50mm "}}>
                  <strong>Phone:</strong> {patientPhone || "N/A"}
                </div>
                <div style={{ flex: "1 1 25mm "}}>
                  <strong>Age:</strong> {age || "--"}
                </div>
                <div style={{ flex: "1 1 30mm "}}>
                  <strong>Gender:</strong> {gender || "--"}
                </div>
              </div>
        </div>
      </header>

      {/* Body: 2 columns */}
      <div style={{ display: "flex", flex: 1, gap: 10 }}>
        {/* Left Column */}
        <section
          style={{
            flex: 1,
            borderRight: "1px solid #999",
            paddingRight: 20,
            boxSizing: "border-box",
            maxWidth: "80mm",
          }}
        >
          <h3>Patient Profile</h3>
          <p style={{ margin: 10 }}>
            <strong>Weight:</strong> {weight || "--"} kg<br />
            <strong>Height:</strong> {formattedHeight || "--"}<br />
            <strong>Waist:</strong> {bodyMeasurements?.waist || "--"} inch<br />
            <strong>Hips:</strong> {bodyMeasurements?.hips || "--"} inch<br />
            <strong>Chest:</strong> {bodyMeasurements?.chest || "--"} inch<br />
            <strong>Activity Level:</strong> {activityLevel || "--"}
          </p>

          <hr style={{ margin: "20px 0" }} />

          <h3>Basic Health Metrics</h3>
          <BasicHealthMetrics personalDetails={personalDetails} />

          <hr style={{ margin: "20px 0" }} />

          <h3 style={{ marginBottom: 10 }}>Existing Diseases</h3>
          {existingDiseases.length === 0 ? (
            <p>None</p>
          ) : (
            <ul>
              {existingDiseases.map((disease) => (
                <li key={disease}>{disease}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Right Column */}
        <section
          style={{
            flex: 1,
            paddingLeft: 20,
            boxSizing: "border-box",
          }}
        >
          <DiseaseBasedFoodSuggestions existingDiseases={existingDiseases} />

          {/* Diet Plan Section */}
          {dietPlan.length > 0 && (
            <>
              
              <h3>Diet Plan</h3>
              <br />
              {dietPlan.map((slot, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  ⏰ <strong>{slot.timeSlot}</strong> at{" "}
                  {formatTime12(slot.time)}
                  <ul style={{ marginTop: 5 }}>
                    {slot.items.map((item, i) => (
                      <li key={i}>
                        {item.quantity} {item.unit} of {item.food}
                        {item.description ? ` (${item.description})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          <div
            style={{
              marginTop: 40,
              borderTop: "1px solid #000",
              paddingTop: 10,
              fontSize: 12,
              textAlign: "center",
              color: "#555",
            }}
          >
            This prescription is computer generated. Follow medical advice
            carefully.
          </div>
        </section>
      </div>
    </div>
  );
}
