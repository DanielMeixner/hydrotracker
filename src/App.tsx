import React, { useState } from 'react';
import Layout from './components/Layout';
import IntakeButtons from './components/IntakeButtons';
import CustomIntakeInput from './components/CustomIntakeInput';
import TodayTotal from './components/TodayTotal';
import BarChart from './components/BarChart';
import HistoryNav from './components/HistoryNav';

const DEFAULT_THRESHOLD = 2000;
const HISTORY_LENGTH = 10;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

const App: React.FC = () => {
  const [threshold] = useState(DEFAULT_THRESHOLD);
  const [history, setHistory] = useState<{ [date: string]: number }>(() => {
    const raw = localStorage.getItem('hydro-history');
    return raw ? JSON.parse(raw) : {};
  });
  const [windowStart, setWindowStart] = useState(0);

  const todayKey = getTodayKey();
  const todayTotal = history[todayKey] || 0;

  const logIntake = (amount: number) => {
    const newHistory = { ...history, [todayKey]: (history[todayKey] || 0) + amount };
    setHistory(newHistory);
    localStorage.setItem('hydro-history', JSON.stringify(newHistory));
  };

  // Prepare history data for bar chart
  const allDates = Object.keys(history).sort().reverse();
  const windowDates = allDates.slice(windowStart, windowStart + HISTORY_LENGTH);
  const barData = windowDates.map(date => history[date]);
  const barLabels = windowDates.map(date => date.slice(5));

  return (
    <Layout>
      <TodayTotal total={todayTotal} threshold={threshold} />
      <IntakeButtons onLog={logIntake} />
      <CustomIntakeInput onLog={logIntake} />
      <BarChart data={barData} labels={barLabels} />
      <HistoryNav
        onPrev={() => setWindowStart(s => Math.min(s + 1, allDates.length - HISTORY_LENGTH))}
        onNext={() => setWindowStart(s => Math.max(s - 1, 0))}
        canPrev={windowStart + HISTORY_LENGTH < allDates.length}
        canNext={windowStart > 0}
      />
    </Layout>
  );
};

export default App;
