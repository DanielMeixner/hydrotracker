// Demo data for Hydro Tracker Demo Mode
// Contains 10 days of dummy water intake and a default threshold

export const DEMO_THRESHOLD = 2000; // ml

// Generate 10 days of demo data (today and 9 previous days)
const today = new Date();

function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export const DEMO_HISTORY = Array.from({ length: 10 }, (_, i) => {
  // Each day is an array of intakes (ml)
  return [250 + i * 5, 500 + i * 3, 330 + i * 2, 400 + i * 4];
}).reverse();

// For compatibility with StateContext
export const DEMO_STATE = {
  history: DEMO_HISTORY,
  currentDay: 0,
  threshold: DEMO_THRESHOLD,
  window: 7,
};
