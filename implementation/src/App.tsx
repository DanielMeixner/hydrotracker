import React from 'react';
import Layout from './components/Layout';
import PredefinedButtons from './components/PredefinedButtons';
import CustomInput from './components/CustomInput';
import TotalAndThreshold from './components/TotalAndThreshold';
import BarChart from './components/BarChart';
import HistoryNavigation from './components/HistoryNavigation';
import { useAppState } from './StateContext';

const App: React.FC = () => {
  const { state, dispatch } = useAppState();
  const { history, currentDay, threshold, window } = state;

  const todayTotal = history[currentDay]?.reduce((a, b) => a + b, 0) || 0;

  const handleAdd = (amount: number) => {
    dispatch({ type: 'ADD_INTAKE', amount });
  };

  const handlePrev = () => {
    dispatch({ type: 'PREV_DAY' });
  };
  const handleNext = () => {
    dispatch({ type: 'NEXT_DAY' });
  };

  // Prepare bar chart data (last N days)
  const barData = history.slice(0, window).map(day => day.reduce((a, b) => a + b, 0));
  while (barData.length < window) barData.push(0);

  return (
    <Layout>
      <h1>HydroTracker</h1>
      <TotalAndThreshold total={todayTotal} threshold={threshold} />
      <PredefinedButtons onClick={handleAdd} />
      <CustomInput onAdd={handleAdd} />
      <BarChart data={barData.reverse()} max={threshold} />
      <HistoryNavigation
        onPrev={handlePrev}
        onNext={handleNext}
        canPrev={currentDay < history.length - 1}
        canNext={currentDay > 0}
      />
    </Layout>
  );
};

export default App;
