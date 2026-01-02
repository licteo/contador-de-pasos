
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const getAICoachingResponse = async (
  history: Message[],
  currentSteps: number,
  goal: number
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are StepSync AI, an elite fitness coach and motivational expert. 
    The user is currently at ${currentSteps} steps with a daily goal of ${goal}.
    
    Guidelines:
    - If they are far from the goal, be encouraging and suggest small ways to get more steps (e.g., take the stairs).
    - If they are close, push them to finish strong.
    - If they exceeded the goal, celebrate their achievement and suggest they cool down or set a higher goal for tomorrow.
    - Keep responses concise, energetic, and professional. Use emojis sparingly but effectively.
    - If asked about health details, remind them you are an AI and they should consult a professional for medical advice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: [{ text: m.content }] 
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble connecting right now, but keep moving!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Take a few steps and try again later!";
  }
};
