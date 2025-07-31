import React, { useState, useEffect } from "react";

const API_BASE =
  "https://script.google.com/macros/s/AKfycbySbEZ_WEp5ShSPQcg_BoHF-K-6I-ovMVLWdQ7iFGOfJjTiuDWi_45fuLq37gZht-ZH/exec";

const generalUnits = ["spoon", "cup", "glass", "ml", "piece", "gm"];

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

export default function PrescribeDiet({ dietPlan, setDietPlan }) {
  const [timeOptions, setTimeOptions] = useState([]);
  const [defaultTimeBySlot, setDefaultTimeBySlot] = useState({});
  const [defaultFoodBySlot, setDefaultFoodBySlot] = useState({});
  const [foodSuggestions, setFoodSuggestions] = useState([]);

  const [timeSlot, setTimeSlot] = useState("");
  const [time, setTime] = useState("");
  const [items, setItems] = useState([{ food: "", quantity: "", unit: "", description: "" }]);
  const [editIndex, setEditIndex] = useState(null);

  // Convert sheet time format to "HH:mm" string
  const convertToTimeString = (value) => {
    const d = new Date(value);
    if (!isNaN(d)) {
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      return `${hh}:${mm}`;
    }
    // fallback if not a date string
    return value || "08:00";
  };

  // Fetch sheet data once on mount
  useEffect(() => {
    fetch(`${API_BASE}?sheet=SuggestedDiet`)
      .then((res) => res.json())
      .then((data) => {
        const slots = [];
        const timeMap = {};
        const foodMap = {};
        const allFoodsSet = new Set();

        data.forEach((row) => {
          const slot = row.TimeSlot;
          const timeStr = row.Time;
          const foodItem = {
            food: row.Food,
            quantity: row.Quantity,
            unit: row.Unit,
            description: row.Description || "",
          };

          if (!slots.includes(slot)) slots.push(slot);
          if (!foodMap[slot]) foodMap[slot] = [];
          foodMap[slot].push(foodItem);
          timeMap[slot] = convertToTimeString(timeStr);

          allFoodsSet.add(row.Food);
        });

        setTimeOptions(slots);
        setDefaultTimeBySlot(timeMap);
        setDefaultFoodBySlot(foodMap);
        setFoodSuggestions(Array.from(allFoodsSet));

        if (slots.length > 0) {
          setTimeSlot(slots[0]);
          setTime(timeMap[slots[0]] || "");
          setItems(foodMap[slots[0]] || [{ food: "", quantity: "", unit: "", description: "" }]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // When timeSlot changes, update form fields from defaults
  useEffect(() => {
    if (!timeSlot) return;
    setTime(defaultTimeBySlot[timeSlot] || "");
    setItems(defaultFoodBySlot[timeSlot] || [{ food: "", quantity: "", unit: "", description: "" }]);
  }, [timeSlot, defaultTimeBySlot, defaultFoodBySlot]);

  // Update item field and fix unit if food changes
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
    setItems([...items, { food: "", quantity: "", unit: "", description: "" }]);
  };

  const removeItem = (index) => {
    if (items.length <= 1) return; // prevent removing last item
    setItems(items.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTimeSlot(timeOptions[0] || "");
    setTime(defaultTimeBySlot[timeOptions[0]] || "");
    setItems(defaultFoodBySlot[timeOptions[0]] || [{ food: "", quantity: "", unit: "", description: "" }]);
    setEditIndex(null);
  };

  const addToDietPlan = () => {
    if (!timeSlot || !time || items.some((i) => !i.food || !i.quantity)) {
      alert("Please fill all fields.");
      return;
    }

    const newSlot = { timeSlot, time, items };

    if (editIndex !== null) {
      const updated = [...dietPlan];
      updated[editIndex] = newSlot;
      setDietPlan(updated);
    } else {
      setDietPlan([...dietPlan, newSlot]);
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
    <section style={{ padding: 20, marginTop: 20 }}>
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
          <div
            key={index}
            style={{ marginBottom: 10, display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <input
              type="text"
              placeholder="Food name"
              value={item.food}
              onChange={(e) => updateItem(index, "food", e.target.value)}
              list="food-suggestions"
              style={{ marginRight: 10, padding: 5 }}
            />
            <datalist id="food-suggestions">
              {foodSuggestions.map((food) => (
                <option key={food} value={food} />
              ))}
            </datalist>

            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", e.target.value)}
              style={{ marginRight: 10, padding: 5, width: 30 }}
            />

            <select
              value={item.unit}
              onChange={(e) => updateItem(index, "unit", e.target.value)}
              style={{ marginRight: 10, padding: 5,width: 70 }}
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
              value={item.description}
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
              <button onClick={() => handleEdit(index)} style={{ padding: "5px 10px", backgroundColor: "#fffb00ff", color: "Black", border: "none" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)} style={{ padding: "5px 10px", backgroundColor: "#e74c3c", color: "white", border: "none" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
