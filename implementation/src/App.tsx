import React, { useState } from 'react';
import Layout from './components/Layout';
import PredefinedButtons from './components/PredefinedButtons';
import CustomInput from './components/CustomInput';
import TotalAndThreshold from './components/TotalAndThreshold';
import BarChart from './components/BarChart';
import HistoryNavigation from './components/HistoryNavigation';

const THRESHOLD = 2000;
const HISTORY_LENGTH = 7;

const App: React.FC = () => {
  const [history, setHistory] = useState<number[][]>([[]]);
  const [currentDay, setCurrentDay] = useState(0);

  const todayTotal = history[currentDay]?.reduce((a, b) => a + b, 0) || 0;

  const handleAdd = (amount: number) => {
    setHistory(h => {
      const newHistory = [...h];
      newHistory[currentDay] = [...(newHistory[currentDay] || []), amount];
      return newHistory;
    });
  };

  const handlePrev = () => {
    if (currentDay < history.length - 1) setCurrentDay(d => d + 1);
  };
  const handleNext = () => {
    if (currentDay > 0) setCurrentDay(d => d - 1);
  };

  // Prepare bar chart data (last 7 days)
  const barData = history.slice(0, HISTORY_LENGTH).map(day => day.reduce((a, b) => a + b, 0));
  while (barData.length < HISTORY_LENGTH) barData.push(0);

  return (
    <Layout>
      <h1>HydroTracker</h1>
      <TotalAndThreshold total={todayTotal} threshold={THRESHOLD} />
      <PredefinedButtons onClick={handleAdd} />
      <CustomInput onAdd={handleAdd} />
      <BarChart data={barData.reverse()} max={THRESHOLD} />
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
