import React, { useState, useEffect } from 'react';
import SetupSection from './components/SetupSection';
import AccountsSection from './components/AccountsSection';
import TweetsSection from './components/TweetsSection';
import DailyTasksSection from './components/DailyTasksSection';
import { getStorage, setStorage } from './utils/storage';
import './App.css';

const BACKEND_URL = 'http://localhost:3000';

function App() {
  const [handle, setHandle] = useState('');
  const [niche, setNiche] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dailyTasks, setDailyTasks] = useState({
    follow5: false,
    comment5: false,
    post1: false,
  });

  // Load saved data from Chrome storage
  useEffect(() => {
    const loadData = async () => {
      const result = await getStorage(['handle', 'niche', 'dailyTasks']);
      if (result.handle) setHandle(result.handle);
      if (result.niche) setNiche(result.niche);
      if (result.dailyTasks) setDailyTasks(result.dailyTasks);
    };
    loadData();
  }, []);

  // Load plan data if handle and niche are set
  useEffect(() => {
    if (handle && niche && accounts.length === 0 && !loading) {
      loadGrowthPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle, niche]);

  const loadGrowthPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/init-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle, niche }),
      });

      if (!response.ok) {
        throw new Error('Failed to load growth plan');
      }

      const data = await response.json();
      setAccounts(data.accounts || []);
      setTweets(data.tweets || []);
    } catch (error) {
      console.error('Error loading growth plan:', error);
      alert('Failed to load growth plan. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!handle || !niche) {
      alert('Please enter your handle and select a niche');
      return;
    }

    // Save to storage
    await setStorage({ handle, niche });
    loadGrowthPlan();
  };

  const handleTaskToggle = async (taskKey) => {
    const updated = { ...dailyTasks, [taskKey]: !dailyTasks[taskKey] };
    setDailyTasks(updated);
    await setStorage({ dailyTasks: updated });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>NichePilot</h1>
        <p className="subtitle">Growth Copilot for X</p>
      </header>

      <div className="app-content">
        <SetupSection
          handle={handle}
          niche={niche}
          onHandleChange={setHandle}
          onNicheChange={setNiche}
          onGenerate={handleGeneratePlan}
          loading={loading}
        />

        {accounts.length > 0 && (
          <AccountsSection accounts={accounts} />
        )}

        {tweets.length > 0 && (
          <TweetsSection tweets={tweets} niche={niche} />
        )}

        <DailyTasksSection
          tasks={dailyTasks}
          onTaskToggle={handleTaskToggle}
        />
      </div>
    </div>
  );
}

export default App;

