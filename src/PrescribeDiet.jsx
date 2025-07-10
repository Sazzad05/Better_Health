import React, { useState, useEffect } from "react";

const timeOptions = [
  "Pre-morning",
  "Morning",
  "Mid-Morning",
  "Noon",
  "Afternoon",
  "Evening",
  "Night",
  "Before-Sleep",
];

const defaultTimeBySlot = {
  "Pre-morning": "06:00",
  Morning: "09:00",
  "Mid-Morning": "11:30",
  Noon: "12:00",
  Afternoon: "14:00",
  Evening: "18:00",
  Night: "21:00",
  "Before-Sleep": "23:30",
};

const defaultFoodBySlot = {
  "Pre-morning": [{ food: "Warm water", quantity: "1", unit: "glass", description: "" }],
  Morning: [
    { food: "Oats", quantity: "1", unit: "cup", description: "" },
    { food: "Boiled Egg", quantity: "1", unit: "piece", description: "" },
  ],
  Noon: [{ food: "Rice", quantity: "1", unit: "cup", description: "" }],
  Afternoon: [{ food: "Fruit", quantity: "1", unit: "piece", description: "" }],
  Evening: [{ food: "Green Tea", quantity: "1", unit: "cup", description: "" }],
  Night: [{ food: "Chapati", quantity: "2", unit: "piece", description: "" }],
};

const allSuggestedFoods = [
  "Warm water",
  "Oats",
  "Boiled Egg",
  "Rice",
  "Fruit",
  "Green Tea",
  "Chapati",
  "Vegetable Curry",
  "Lentil Soup",
  "Chicken Breast",
  "Banana",
  "Milk",
  "Salad",
];

const unitOptionsByFood = {
  "Warm water": ["glass", "ml"],
  Oats: ["cup", "spoon", "gm"],
  "Boiled Egg": ["piece"],
  Rice: ["cup", "gm"],
  Fruit: ["piece", "gm"],
  "Green Tea": ["cup", "ml"],
  Chapati: ["piece"],
  "Vegetable Curry": ["cup", "gm"],
  "Lentil Soup": ["cup", "ml"],
  "Chicken Breast": ["gm", "piece"],
  Banana: ["piece", "gm"],
  Milk: ["cup", "ml"],
  Salad: ["cup", "gm"],
};

const generalUnits = ["spoon", "cup", "glass", "ml", "piece", "gm"];

export default function PrescribeDiet({ dietPlan, setDietPlan }) {
  const [timeSlot, setTimeSlot] = useState("Morning");
  const [time, setTime] = useState(defaultTimeBySlot["Morning"]);
  const [items, setItems] = useState(defaultFoodBySlot["Morning"]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setTime(defaultTimeBySlot[timeSlot] || "");
    setItems(defaultFoodBySlot[timeSlot] || [{ food: "", quantity: "", unit: "cup", description: "" }]);
  }, [timeSlot]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "food") {
      const allowedUnits = unitOptionsByFood[value] || generalUnits;
      if (!allowedUnits.includes(updated[index].unit)) {
        updated[index].unit = allowedUnits[0];
      }
    }
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { food: "", quantity: "", unit: "cup", description: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTimeSlot("Morning");
    setTime(defaultTimeBySlot["Morning"]);
    setItems(defaultFoodBySlot["Morning"]);
    setEditIndex(null);
  };

  const addToDietPlan = () => {
    if (!timeSlot || !time || items.some((i) => !i.food || !i.quantity)) {
      return alert("Please fill all fields.");
    }

    const newSlot = { timeSlot, time, items };

    if (editIndex !== null) {
      const updated = [...dietPlan];
      updated[editIndex] = newSlot;
      setDietPlan(updated);
    } else {
      setDietPlan((prev) => [...prev, newSlot]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const slot = dietPlan[index];
    setTimeSlot(slot.timeSlot);
    setTime(slot.time);
    setItems(slot.items);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = dietPlan.filter((_, i) => i !== index);
    setDietPlan(updated);
  };

  return (
    <section style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, marginTop: 20 }}>
      <h2>Prescribe Diet</h2>

      <label>
        Time Slot:
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        >
          {timeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        />
      </label>

      <h4 style={{ marginTop: 20 }}>Diet Items:</h4>
      {items.map((item, index) => {
        const allowedUnits = unitOptionsByFood[item.food] || generalUnits;
        return (
          <div key={index} style={{ marginBottom: 10, display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Food name"
              value={item.food}
              onChange={(e) => updateItem(index, "food", e.target.value)}
              list="food-suggestions"
              style={{ marginRight: 10, padding: 5 }}
            />
            <datalist id="food-suggestions">
              {allSuggestedFoods.map((food) => (
                <option key={food} value={food} />
              ))}
            </datalist>

            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", e.target.value)}
              style={{ marginRight: 10, padding: 5, width: 80 }}
            />

            <select
              value={item.unit}
              onChange={(e) => updateItem(index, "unit", e.target.value)}
              style={{ marginRight: 10, padding: 5 }}
            >
              {allowedUnits.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Description"
              value={item.description || ""}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              style={{ marginRight: 10, padding: 5, width: 180 }}
            />

            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                style={{ padding: "5px 10px", backgroundColor: "#e74c3c", color: "white", border: "none" }}
              >
                Remove
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={addItem}
        style={{ padding: "5px 10px", backgroundColor: "#3498db", color: "white", border: "none", marginBottom: 15 }}
      >
        + Add Item
      </button>

      <br />

      <button
        onClick={addToDietPlan}
        style={{ backgroundColor: "#2ecc71", color: "white", border: "none", padding: "10px 15px", cursor: "pointer" }}
        type="button"
      >
        {editIndex !== null ? "Update Prescription" : "+ Add to Prescription"}
      </button>

      {dietPlan.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>Diet Prescription</h3>
          {dietPlan.map((slot, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: 10, paddingBottom: 10 }}>
              <strong>{slot.timeSlot}</strong> at {slot.time}
              <ul>
                {slot.items.map((item, i) => (
                  <li key={i}>
                    {item.quantity} {item.unit} of {item.food}
                    {item.description ? ` (${item.description})` : ""}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleEdit(index)} style={{ marginRight: 10 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)} style={{ color: "#c0392b" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}