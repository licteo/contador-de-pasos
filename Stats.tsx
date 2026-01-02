
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_WEEKLY_DATA } from '../constants';

const Stats: React.FC = () => {
  const averageSteps = Math.round(MOCK_WEEKLY_DATA.reduce((acc, curr) => acc + curr.steps, 0) / MOCK_WEEKLY_DATA.length);

  return (
    <div className="flex flex-col items-center p-6 space-y-6 pb-24">
      <div className="w-full max-w-md bg-slate-800/50 rounded-3xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">Weekly Performance</h2>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_WEEKLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                {MOCK_WEEKLY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps >= entry.goal ? '#10b981' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-700/40 p-4 rounded-2xl border border-slate-600">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Avg Steps</p>
            <p className="text-2xl font-bold text-white mt-1">{averageSteps.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700/40 p-4 rounded-2xl border border-slate-600">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Goal Met</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">4/7 Days</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <h3 className="text-lg font-bold text-white px-2">Achievements</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-shrink-0 w-24 h-24 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex flex-col items-center justify-center space-y-1">
            <i className="fas fa-medal text-amber-500 text-2xl"></i>
            <span className="text-[10px] text-amber-200 font-bold uppercase text-center">First 10k</span>
          </div>
          <div className="flex-shrink-0 w-24 h-24 bg-blue-500/10 rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center space-y-1">
            <i className="fas fa-fire text-blue-500 text-2xl"></i>
            <span className="text-[10px] text-blue-200 font-bold uppercase text-center">3 Day Streak</span>
          </div>
          <div className="flex-shrink-0 w-24 h-24 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 flex flex-col items-center justify-center space-y-1">
            <i className="fas fa-trophy text-emerald-500 text-2xl"></i>
            <span className="text-[10px] text-emerald-200 font-bold uppercase text-center">Top 1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
