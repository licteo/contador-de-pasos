
import React from 'react';
import CircularProgress from './CircularProgress';
import { StepData, UserProfile } from '../types';

interface DashboardProps {
  stepData: StepData;
  profile: UserProfile;
  isTracking: boolean;
  onToggleTracking: () => void;
  onSimulateStep: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stepData, 
  profile, 
  isTracking, 
  onToggleTracking,
  onSimulateStep
}) => {
  const percentage = Math.round((stepData.steps / profile.stepGoal) * 100);

  return (
    <div className="flex flex-col items-center p-6 space-y-8 pb-24">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700 shadow-2xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-slate-400 mb-6 uppercase tracking-wider">Today's Progress</h2>
        
        <CircularProgress value={stepData.steps} max={profile.stepGoal}>
          <span className="text-5xl font-black text-white">{stepData.steps.toLocaleString()}</span>
          <span className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Steps</span>
        </CircularProgress>

        <div className="mt-8 grid grid-cols-3 gap-6 w-full">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-white">{stepData.distance.toFixed(2)}</span>
            <span className="text-slate-500 text-xs uppercase">Km</span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-700">
            <span className="text-xl font-bold text-white">{Math.round(stepData.calories)}</span>
            <span className="text-slate-500 text-xs uppercase">Kcal</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-white">{percentage}%</span>
            <span className="text-slate-500 text-xs uppercase">Goal</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col space-y-4">
        <button 
          onClick={onToggleTracking}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 shadow-lg ${
            isTracking 
            ? 'bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500/20' 
            : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400'
          }`}
        >
          <i className={`fas ${isTracking ? 'fa-pause' : 'fa-play'}`}></i>
          <span>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</span>
        </button>

        <button 
          onClick={onSimulateStep}
          className="w-full py-3 rounded-2xl bg-slate-700/50 text-slate-300 font-medium border border-slate-600 hover:bg-slate-700 flex items-center justify-center space-x-3"
        >
          <i className="fas fa-shoe-prints"></i>
          <span>Simulate +50 Steps</span>
        </button>
      </div>

      <div className="w-full max-w-md p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-start space-x-4">
        <div className="p-3 bg-indigo-500 rounded-xl text-slate-900">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div>
          <h4 className="font-bold text-indigo-300">Daily Tip</h4>
          <p className="text-slate-400 text-sm mt-1">
            Taking a 10-minute walk after lunch can improve digestion and boost your energy levels for the afternoon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
