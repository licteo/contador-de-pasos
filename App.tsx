
import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, StepData, UserProfile } from './types';
import { DEFAULT_GOAL, CALORIES_PER_STEP, DISTANCE_PER_STEP } from './constants';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import AICoach from './components/AICoach';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isTracking, setIsTracking] = useState(false);
  const [profile] = useState<UserProfile>({
    name: 'Champion',
    weight: 70,
    stepGoal: DEFAULT_GOAL
  });

  const [stepData, setStepData] = useState<StepData>({
    steps: 0,
    calories: 0,
    distance: 0,
    timestamp: new Date().toISOString()
  });

  // Handle real sensor data (simplified logic for web)
  useEffect(() => {
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    const threshold = 12; // Threshold for step detection

    const handleMotion = (event: DeviceMotionEvent) => {
      if (!isTracking) return;

      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const deltaX = Math.abs(acc.x - lastAcceleration.x);
      const deltaY = Math.abs(acc.y - lastAcceleration.y);
      const deltaZ = Math.abs(acc.z - lastAcceleration.z);

      if (deltaX + deltaY + deltaZ > threshold) {
        addSteps(1);
      }

      lastAcceleration = { x: acc.x, y: acc.y, z: acc.z };
    };

    if (isTracking && typeof DeviceMotionEvent !== 'undefined' && 'requestPermission' in DeviceMotionEvent) {
      // @ts-ignore
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
        }
      });
    } else if (isTracking) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [isTracking]);

  const addSteps = useCallback((count: number) => {
    setStepData(prev => {
      const newSteps = prev.steps + count;
      return {
        ...prev,
        steps: newSteps,
        calories: newSteps * CALORIES_PER_STEP,
        distance: newSteps * DISTANCE_PER_STEP,
        timestamp: new Date().toISOString()
      };
    });
  }, []);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const simulateStep = () => {
    addSteps(50);
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-slate-900 relative">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <span className="bg-indigo-600 p-1 rounded-lg"><i className="fas fa-bolt text-xs"></i></span>
            <span>StepSync AI</span>
          </h1>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-tighter">Powered by Gemini</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
          <i className="fas fa-user"></i>
        </button>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-160px)]">
        {activeTab === AppTab.DASHBOARD && (
          <Dashboard 
            stepData={stepData} 
            profile={profile} 
            isTracking={isTracking} 
            onToggleTracking={toggleTracking}
            onSimulateStep={simulateStep}
          />
        )}
        {activeTab === AppTab.STATS && <Stats />}
        {activeTab === AppTab.AI_COACH && <AICoach currentSteps={stepData.steps} goal={profile.stepGoal} />}
        {activeTab === AppTab.SETTINGS && (
          <div className="p-6 text-center text-slate-500">
            <i className="fas fa-cog text-4xl mb-4"></i>
            <p>Settings coming soon!</p>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-3 shadow-2xl z-50 flex justify-between items-center">
        <NavButton 
          active={activeTab === AppTab.DASHBOARD} 
          icon="fa-house" 
          onClick={() => setActiveTab(AppTab.DASHBOARD)} 
        />
        <NavButton 
          active={activeTab === AppTab.STATS} 
          icon="fa-chart-simple" 
          onClick={() => setActiveTab(AppTab.STATS)} 
        />
        <div className="relative -top-6">
          <button 
            onClick={() => setActiveTab(AppTab.AI_COACH)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
              activeTab === AppTab.AI_COACH 
              ? 'bg-indigo-600 text-white scale-110' 
              : 'bg-slate-700 text-slate-300'
            }`}
          >
            <i className="fas fa-robot text-xl"></i>
          </button>
        </div>
        <NavButton 
          active={activeTab === AppTab.SETTINGS} 
          icon="fa-gear" 
          onClick={() => setActiveTab(AppTab.SETTINGS)} 
        />
        <NavButton 
          active={false} 
          icon="fa-bell" 
          onClick={() => {}} 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-2xl transition-all duration-300 ${
      active ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <i className={`fas ${icon} text-lg`}></i>
  </button>
);

export default App;
