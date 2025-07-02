import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Allow demo mode injection
export let DEMO_MODE = false;
export let DEMO_INITIAL_STATE: State | undefined = undefined;
export function setDemoMode(state: State) {
  DEMO_MODE = true;
  DEMO_INITIAL_STATE = state;
}

// State structure
type IntakeEntry = number;
interface State {
  history: IntakeEntry[][];
  currentDay: number;
  threshold: number;
  window: number;
}

type Action =
  | { type: 'ADD_INTAKE'; amount: number }
  | { type: 'PREV_DAY' }
  | { type: 'NEXT_DAY' }
  | { type: 'SET_THRESHOLD'; threshold: number };


function loadState(): State {
  if (DEMO_MODE && DEMO_INITIAL_STATE) {
    return DEMO_INITIAL_STATE;
  }
  try {
    const data = localStorage.getItem('hydrotracker-state');
    if (data) {
      return JSON.parse(data);
    }
  } catch {}
  return {
    history: [[]],
    currentDay: 0,
    threshold: 2000,
    window: 7,
  };
}


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
    default:
      return state;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: {
    history: [[]],
    currentDay: 0,
    threshold: 2000,
    window: 7,
  },
  dispatch: () => undefined
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, loadState());
  useEffect(() => {
    if (!DEMO_MODE) {
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
