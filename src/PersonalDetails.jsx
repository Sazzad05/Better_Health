import React from "react";
import './App.css';
// import './index.css';

export default function PersonalDetails({ data, setData }) {
  const updateBodyMeasurement = (field, value) => {
    setData((prev) => ({
      ...prev,
      bodyMeasurements: { ...prev.bodyMeasurements, [field]: value },
    }));
  };

  return (
    <section className="left-box">
      <h2>Personal Details</h2>

      <label>
        Patient ID:
        <input
            type="text"
            value={String(data.patientId).padStart(7, '0')} // 👈 7-digit formatting
            readOnly
            style={{ marginLeft: 10, padding: 5, width: 120, background: "#9b114f", color: "white" }}
        />
      </label>

      <br /><br />

      <label>
        Name:&nbsp;&nbsp;
        <input
          type="text"
          value={data.patientName}
          onChange={(e) => setData({ ...data, patientName: e.target.value })}
          placeholder="Full name"
          style={{width: 200, padding: "5px 0px 5px 5px"}}
        />
      </label>

      <br /><br />

      <label>
        Phone:&nbsp;&nbsp;
        <input
          type="tel"
          value={data.patientPhone}
          onChange={(e) => setData({ ...data, patientPhone: e.target.value })}
          placeholder="01XXXXXXXXX"
          style={{width: 150, padding: "5px 0px 5px 5px"}}
        />
      </label>

      <br /><br />

      <label>
      
        Age:
        <input
          type="number"
          min="1"
          max="120"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          style={{ margin: "0px 10px 0px 5px", padding: 5, width: 30 }}
        />&nbsp;&nbsp;
        Gender: &nbsp;
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={() => setData({ ...data, gender: "male" })}
          />
          &nbsp; Male
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={() => setData({ ...data, gender: "female" })}
          />
          &nbsp; Female
        </label>
      </label>


      <br /><br />

      <label>
        Weight (kg):
        <input
          type="number"
          min="2"
          max="300"
          value={data.weight}
          onChange={(e) => setData({ ...data, weight: e.target.value })}
          style={{ marginLeft: 10, padding: 5, width: 100 }}
        />
      </label>

      <br /><br />

      <fieldset>
        <legend>
        Height Unit:
        <label style={{ marginLeft: 10 }} >
          <input
            type="radio"
            value="cm"
            checked={data.heightUnit === "cm"}
            onChange={() => setData({ ...data, heightUnit: "cm" })}
          />
          &nbsp;cm
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="radio"
            value="ft"
            checked={data.heightUnit === "ft"}
            onChange={() => setData({ ...data, heightUnit: "ft" })}
          />
          &nbsp;ft/in
        </label>
      </legend>

      {data.heightUnit === "cm" ? (
        <label style={{ display: "block"}}>
          Height (cm):
          <input
            type="number"
            min="30"
            max="250"
            value={data.heightCm}
            onChange={(e) => setData({ ...data, heightCm: e.target.value })}
            style={{ marginLeft: 10, padding: 5, width: 100 }}
          />
        </label>
      ) : (
        <div  style={{ display: "block"}}>
          <label>
            Feet:
            <input
              type="number"
              min="0"
              max="8"
              value={data.heightFeet}
              onChange={(e) => setData({ ...data, heightFeet: e.target.value })}
              style={{ marginLeft: 10, padding: 5, width: "20%", marginRight:10 }}
            /> 
          </label>
          <label>
            Inches:
            <input
              type="number"
              min="0"
              max="11"
              value={data.heightInches}
              onChange={(e) => setData({ ...data, heightInches: e.target.value })}
              style={{ marginLeft: 10, padding: 5, width: "20%" }}
            />
          </label>
        </div>
      )}
      </fieldset>
      <br />
      <fieldset>
        <legend>Body Measurements (inch)</legend>
        <label>
          Waist:
          <input
            type="number"
            value={data.bodyMeasurements.waist}
            onChange={(e) => updateBodyMeasurement("waist", e.target.value)}
            style={{ margin: "0px 10px 0px 5px", padding: 5, width: 30 }}
          /> 
        </label>
        <label>
          Hips:
          <input
            type="number"
            value={data.bodyMeasurements.hips}
            onChange={(e) => updateBodyMeasurement("hips", e.target.value)}
            style={{ margin: "0px 10px 0px 5px", padding: 5, width: 30 }}
          /> 
        </label>
        <label>
          Chest:
          <input
            type="number"
            value={data.bodyMeasurements.chest}
            onChange={(e) => updateBodyMeasurement("chest", e.target.value)}
            style={{ margin: "0px 10px 0px 5px", padding: 5, width: 30 }}
          />
        </label>
      </fieldset>

      <br />

      <label>
        Activity Level:
        <select
          value={data.activityLevel}
          onChange={(e) => setData({ ...data, activityLevel: e.target.value })}
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="veryActive">Very Active</option>
        </select>
      </label>

      <br />

      {/* <label>
        Exercise Type:
        <input
          type="text"
          value={data.exerciseType}
          onChange={(e) => setData({ ...data, exerciseType: e.target.value })}
          placeholder="e.g., Running"
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
        />
      </label> */}

      <br />

      {/* <label>
        Exercise Timing:
        <input
          type="text"
          value={data.exerciseTiming}
          onChange={(e) => setData({ ...data, exerciseTiming: e.target.value })}
          placeholder="e.g., Morning"
          style={{width: "100%", padding: "5px 0px 5px 5px"}}
        />
      </label> */}
    </section>
  );
}
