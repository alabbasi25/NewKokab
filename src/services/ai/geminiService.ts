import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (typeof window === 'undefined') return null;
  
  if (!aiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const GeminiService = {
  analyzeRelationship: async (data: any) => {
    const ai = getAI();
    if (!ai) return "AI service unavailable (missing configuration).";
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Analyze this relationship data and provide insights: " + JSON.stringify(data),
    });
    return response.text;
  },
  
  suggestTasks: async (context: string) => {
    const ai = getAI();
    if (!ai) return "AI service unavailable.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Based on this context, suggest 3 tasks for a couple: " + context,
    });
    return response.text;
  }
};
