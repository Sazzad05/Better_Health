import { useState, useEffect } from "react";

const SHEET_URLS = {
  diseases:
    "https://script.google.com/macros/s/AKfycbxeKiP7lI4_ht6xmkvcZqgdawMmjgQ0lKTB_rAiEwIJ_lEYOPcZe1Sy95B-LQXkVL3U/exec?sheet=SuggestedFood",
  diet:
    "https://script.google.com/macros/s/AKfycbySbEZ_WEp5ShSPQcg_BoHF-K-6I-ovMVLWdQ7iFGOfJjTiuDWi_45fuLq37gZht-ZH/exec?sheet=SuggestedDiet",
  // Add other sheets as needed
};

function useFetchJson(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Hook to get diseases list
export function useDiseases() {
  const { data, loading, error } = useFetchJson(SHEET_URLS.diseases);

  // extract unique diseases
  const diseases = data && Array.isArray(data)
    ? [...new Set(data.map((row) => row.Disease?.trim()))].filter(Boolean).sort()
    : [];

  return { diseases, loading, error };
}

// Hook to get diet suggestions (time slots, foods by slot, etc.)
export function useDietSuggestions() {
  const { data, loading, error } = useFetchJson(SHEET_URLS.diet);

  if (!data || !Array.isArray(data)) {
    return { timeSlots: [], timeBySlot: {}, foodsBySlot: {}, allFoods: [], loading, error };
  }

  const timeSlots = [];
  const timeBySlot = {};
  const foodsBySlot = {};
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

    if (!timeSlots.includes(slot)) timeSlots.push(slot);
    if (!foodsBySlot[slot]) foodsBySlot[slot] = [];
    foodsBySlot[slot].push(foodItem);
    timeBySlot[slot] = timeStr;

    allFoodsSet.add(row.Food);
  });

  return {
    timeSlots,
    timeBySlot,
    foodsBySlot,
    allFoods: Array.from(allFoodsSet),
    loading,
    error,
  };
}

// You can add more hooks here as needed
