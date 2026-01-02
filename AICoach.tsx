
import React, { useState, useRef, useEffect } from 'react';
import { Message, StepData } from '../types';
import { getAICoachingResponse } from '../services/geminiService';

interface AICoachProps {
  currentSteps: number;
  goal: number;
}

const AICoach: React.FC<AICoachProps> = ({ currentSteps, goal }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! I'm your AI Coach. How are you feeling about your movement today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseContent = await getAICoachingResponse([...messages, userMessage], currentSteps, goal);
    
    setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-md mx-auto p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2 scrollbar-hide" ref={scrollRef}>
        {messages.map((m, idx) => (
          <div 
            key={idx} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex space-x-1">
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for advice or motivation..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-indigo-600 text-white p-3 rounded-2xl w-12 h-12 flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default AICoach;
