import { GoogleGenAI, Modality, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getVendingConsultantResponse = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are an expert consultant for vending machine placement across Moscow and the Moscow region. 
      Your goal is to help entrepreneurs find the most profitable locations for vending machines in various settings: shopping malls, business centers, transport hubs, parks, and residential areas.
      Use your Google Search tool to find real-time information about:
      1. High-traffic locations (malls, metro stations, train stations).
      2. Existing vending machine density in specific districts.
      3. Consumer behavior and preferences in different parts of Moscow.
      4. Rent prices and legal requirements for placing machines.
      
      When suggesting a location, provide specific coordinates or addresses if possible.
      Always be professional, data-driven, and helpful.
      If the user asks about a specific area or city in the Moscow region, use Google Search to find its exact characteristics and potential for vending.`,
      tools: [
        { googleSearch: {} }
      ],
    },
    history: history,
  });

  const response = await chat.sendMessage({ message });
  return response;
};
