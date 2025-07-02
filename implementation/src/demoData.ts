// Demo data for Hydro Tracker Demo Mode
// Contains 10 days of dummy water intake and a default threshold

export const DEMO_THRESHOLD = 2000; // ml

// Generate 10 days of demo data (today and 9 previous days)
const today = new Date();

function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

// Generate 30 days of demo data (today and 29 previous days)
export const DEMO_HISTORY = Array.from({ length: 30 }, (_, i) => {
  // Each day is an array of intakes (ml)
  // Add some variation for realism
  const base = 200 + (i % 5) * 50;
  return [
    base + Math.floor(Math.random() * 40),
    base + 100 + Math.floor(Math.random() * 40),
    base + 200 + Math.floor(Math.random() * 40),
    base + 300 + Math.floor(Math.random() * 40)
  ];
}).reverse();

// For compatibility with StateContext
export const DEMO_STATE = {
  history: DEMO_HISTORY,
  currentDay: 0,
  threshold: DEMO_THRESHOLD,
  window: 7,
};
