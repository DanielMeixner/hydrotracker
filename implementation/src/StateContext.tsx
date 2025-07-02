import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// State structure
type IntakeEntry = number;
interface State {
  history: IntakeEntry[][];
  currentDay: number;
  threshold: number;
  window: number;
  isDemo: boolean;
}

type Action =
  | { type: 'ADD_INTAKE'; amount: number }
  | { type: 'PREV_DAY' }
  | { type: 'NEXT_DAY' }
  | { type: 'SET_THRESHOLD'; threshold: number }
  | { type: 'ENTER_DEMO' }
  | { type: 'EXIT_DEMO' };


// Demo Mode sample data
const demoData: State = {
  history: [
    [250, 300, 200], // Day 0 (today): 750ml
    [200, 500, 300, 400], // Day 1: 1400ml
    [300, 300, 200, 250, 150], // Day 2: 1200ml
    [500, 300, 200], // Day 3: 1000ml
    [200, 200, 300, 500, 250, 300], // Day 4: 1750ml
    [400, 300, 200, 150], // Day 5: 1050ml
    [250, 250, 200, 300, 200], // Day 6: 1200ml
  ],
  currentDay: 0,
  threshold: 2000,
  window: 7,
  isDemo: true,
};

function loadState(): State {
  // Check if demo mode is requested via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const isDemoMode = urlParams.get('demo') === 'true';
  
  if (isDemoMode) {
    return demoData;
  }
  
  try {
    const data = localStorage.getItem('hydrotracker-state');
    if (data) {
      const parsedData = JSON.parse(data);
      return { ...parsedData, isDemo: false };
    }
  } catch {}
  return {
    history: [[]],
    currentDay: 0,
    threshold: 2000,
    window: 7,
    isDemo: false,
  };
}

const initialState: State = loadState();

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_INTAKE': {
      const newHistory = [...state.history];
      newHistory[state.currentDay] = [...(newHistory[state.currentDay] || []), action.amount];
      return { ...state, history: newHistory };
    }
    case 'PREV_DAY': {
      if (state.currentDay < state.history.length - 1) {
        return { ...state, currentDay: state.currentDay + 1 };
      }
      return state;
    }
    case 'NEXT_DAY': {
      if (state.currentDay > 0) {
        return { ...state, currentDay: state.currentDay - 1 };
      }
      return state;
    }
    case 'SET_THRESHOLD': {
      return { ...state, threshold: action.threshold };
    }
    case 'ENTER_DEMO': {
      return { ...demoData };
    }
    case 'EXIT_DEMO': {
      // Load actual user data from localStorage
      try {
        const data = localStorage.getItem('hydrotracker-state');
        if (data) {
          const parsedData = JSON.parse(data);
          return { ...parsedData, isDemo: false };
        }
      } catch {}
      // Return default state if no saved data
      return {
        history: [[]],
        currentDay: 0,
        threshold: 2000,
        window: 7,
        isDemo: false,
      };
    }
    default:
      return state;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // Only save to localStorage if not in demo mode
    if (!state.isDemo) {
      localStorage.setItem('hydrotracker-state', JSON.stringify(state));
    }
  }, [state]);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
