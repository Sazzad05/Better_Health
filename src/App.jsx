import { useRef, useState } from "react";
import "./App.css";

import PersonalDetails from "./PersonalDetails";
import MedicalProfile from "./MedicalProfile";
import BasicHealthMetrics from "./BasicHealthMetrics";
import DiseaseBasedFoodSuggestions from "./DiseaseBasedFoodSuggestions";
import PdfExporter from "./PdfExporter";
import PrescriptionTemplate from "./PrescriptionTemplate";
import Prescription from "./Prescription";
import PrescribeDiet from "./PrescribeDiet";
import PrescribeMedication from "./PrescribeMedication";
import NavHead from "./NavHead";

export default function App() {
  const [patientCounter, setPatientCounter] = useState(1);
  const pdfRef = useRef();

  const [personalDetails, setPersonalDetails] = useState({
    patientId: 1,
    patientName: "",
    patientPhone: "",
    bloodPressure: "",
    age: "",
    gender: "male",
    weight: "",
    heightUnit: "ft",
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    bodyMeasurements: {
      waist: "",
      hips: "",
      chest: "",
    },
    activityLevel: "sedentary",
    exerciseType: "",
    exerciseTiming: "",
  });

  const [medicalProfile, setMedicalProfile] = useState({
    existingDiseases: [],
    currentSymptoms: "",
    medications: "",
    allergies: "",
    familyMedicalHistory: "",
  });

  const [dietPlan, setDietPlan] = useState([]);
  const [medicationPlan, setMedicationPlan] = useState([]);

  // NEW STATE: which component to show in item2
  const [activeSection, setActiveSection] = useState("medicalProfile"); // default

  const handleNextPatient = () => {
    const nextId = patientCounter + 1;
    setPatientCounter(nextId);
    setPersonalDetails({
      patientId: nextId,
      patientName: "",
      patientPhone: "",
      bloodPressure: "",
      age: "",
      gender: "male",
      weight: "",
      heightUnit: "ft",
      heightCm: "",
      heightFeet: "",
      heightInches: "",
      bodyMeasurements: {
        waist: "",
        hips: "",
        chest: "",
      },
      activityLevel: "sedentary",
      exerciseType: "",
      exerciseTiming: "",
    });
    setMedicalProfile({
      existingDiseases: [],
      currentSymptoms: "",
      medications: "",
      allergies: "",
      familyMedicalHistory: "",
    });
    setDietPlan([]);
    setMedicationPlan([]);
    setActiveSection("medicalProfile"); // reset toggle to default on next patient
  };

  return (
    <>
      <NavHead pdfRef={pdfRef} onNextPatient={handleNextPatient} />

      <div className="grid-container">
        {/* Left Section */}
        <div className="item1">
          <PersonalDetails data={personalDetails} setData={setPersonalDetails} />
          <BasicHealthMetrics personalDetails={personalDetails} />
        </div>

        {/* Right Section */}
        <div className="item2">
          {/* Toggle buttons */}
          <div className="toggle-buttons" style={{ marginBottom: "10px" }}>
            <button
              onClick={() => setActiveSection("medicalProfile")}
              style={{
                backgroundColor: activeSection === "medicalProfile" ? "#9b114f" : "hsla(330, 66%, 90%, 1.00)",
                color: activeSection === "medicalProfile" ? "white" : "black",                
              }}
            >
              Medical Profile
            </button>

            <button
              onClick={() => setActiveSection("prescribeDiet")}
              style={{
                backgroundColor: activeSection === "prescribeDiet" ? "#9b114f" : "hsla(330, 66%, 90%, 1.00)",
                color: activeSection === "prescribeDiet" ? "white" : "black",
              }}
            >
              Diet Plan
            </button>

            <button
              onClick={() => setActiveSection("prescribeMedication")}
              style={{
                backgroundColor: activeSection === "prescribeMedication" ? "#9b114f" : "hsla(330, 66%, 90%, 1.00)",
                color: activeSection === "prescribeMedication" ? "white" : "black",
              }}
            >
              Medication Plan
            </button>
          </div>

          {/* Components always rendered but hidden/shown */}
          <div style={{ display: activeSection === "medicalProfile" ? "block" : "none" }}>
            <MedicalProfile data={medicalProfile} setData={setMedicalProfile} />
          </div>

          <div style={{ display: activeSection === "prescribeDiet" ? "block" : "none" }}>
            <PrescribeDiet dietPlan={dietPlan} setDietPlan={setDietPlan} />
          </div>

          <div style={{ display: activeSection === "prescribeMedication" ? "block" : "none" }}>
            <PrescribeMedication
              medicationPlan={medicationPlan}
              setMedicationPlan={setMedicationPlan}
            />
          </div>
        </div>

        {/* PDF Content */}
        <div
          className="item3 pdf-make"
          ref={pdfRef}
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "0mm",
            background: "#fff",
          }}
        >
          <PrescriptionTemplate
            clinicName="Healthyou"
            doctorName="Tasmia Afsin Tisha"
            doctordesignation="Clinical Dietitian & Nutritionist"
            doctordegree1="BSc (Hons) in Food and Nutrition."
            doctordegree2="MSc in Food and Nutrition."
            doctorCertification1="Certification in CCND (BADN)"
            doctorCertification2="Certified Fitness and Nutrition Coach (NESTA - California, USA)"
            doctorPhone="01940175796"
            doctorEmail="tasmiatisha143@gmail.com"
            patientName={personalDetails.patientName}
            patientAge={personalDetails.age}
            patientGender={personalDetails.gender}
            patientPhone={personalDetails.patientPhone}
            patientId={personalDetails.patientId}
            date={new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            medications={medicationPlan}
            notes="Take medication after meals. Drink plenty of water."
            personalDetails={personalDetails}
            medicalProfile={medicalProfile}
            dietPlan={dietPlan}
          />
        </div>
      </div>
    </>
  );
}
