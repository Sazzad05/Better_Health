import { useRef, useState } from "react";
import "./App.css";

import PersonalDetails from "./PersonalDetails";
import MedicalProfile from "./MedicalProfile";
import BasicHealthMetrics from "./BasicHealthMetrics";
import DiseaseBasedFoodSuggestions from "./DiseaseBasedFoodSuggestions";
import PdfExporter from "./PdfExporter";
import PrescriptionTemplate from "./PrescriptionTemplate";
import Prescription from "./Prescription";
import PrescribeDiet from "./PrescribeDiet"; // NEW IMPORT

export default function App() {
  const [patientCounter, setPatientCounter] = useState(1);
  const pdfRef = useRef();

  const [personalDetails, setPersonalDetails] = useState({
    patientId: 1,
    patientName: "",
    patientPhone: "",
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

  const [dietPlan, setDietPlan] = useState([]); // NEW STATE

  const medications = [
    { name: "Paracetamol", dosage: "500 mg", frequency: "3 times a day" },
    { name: "Vitamin D", dosage: "1000 IU", frequency: "Once a day" },
  ];

  const handleNextPatient = () => {
    const nextId = patientCounter + 1;
    setPatientCounter(nextId);
    setPersonalDetails({
      patientId: nextId,
      patientName: "",
      patientPhone: "",
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
    setDietPlan([]); // RESET DIET PLAN
  };

  return (
    <>
      <h1>Health & Nutrition Dashboard</h1>

      <div className="grid-container">
        {/* Left Section */}
        <div className="item1">
          <PersonalDetails data={personalDetails} setData={setPersonalDetails} />
          <BasicHealthMetrics personalDetails={personalDetails} />
        </div>

        {/* Right Section */}
        <div className="item2">
          <MedicalProfile data={medicalProfile} setData={setMedicalProfile} />

          <PrescribeDiet dietPlan={dietPlan} setDietPlan={setDietPlan} /> {/* NEW */}

          {/* <Prescription /> */}

          {/* Bottom Section - PDF Export */}
          <div style={{ marginTop: "20px" }}>
            <PdfExporter targetRef={pdfRef} />
          </div>

          <button
            onClick={handleNextPatient}
            style={{ marginTop: 30, padding: "10px 20px", fontSize: 16 }}
          >
            Next Patient
          </button>
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
            clinicName="Healthyou "
            doctorName="Tasmia Afsin Tisha "
            doctordesignation="Clinical Dietitian & Nutritionist"
            doctordegree1="BSc (Hons) in Food and Nutrition."
            doctordegree2="MSc in Food and Nutrition."
            doctorCertification1="Certification in CCND (BADN)"
            doctorCertification2="Certified Fitness and Nutrition Coach ( NESTA - California, USA)"
            doctorPhone="☏ 01940175796"
            doctorEmail="✉︎ tasmiatisha143@gmail.com"
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
            medications={medications}
            notes="Take medication after meals. Drink plenty of water."
            personalDetails={personalDetails}
            medicalProfile={medicalProfile}
            dietPlan={dietPlan} // NEW PROP
          />
        </div>
      </div>
    </>
  );
}
