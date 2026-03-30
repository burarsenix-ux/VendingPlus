import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TrafficData {
  location: string;
  lat: number;
  lng: number;
  intensity: number; // 0 to 1
  description: string;
}

export const fetchLiveTrafficData = async (): Promise<TrafficData[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the current traffic hotspots and pedestrian congestion areas in Moscow and the Moscow region right now? Provide a list with approximate coordinates (lat, lng) and intensity (0.0 to 1.0). Format as JSON array of objects: {location, lat, lng, intensity, description}.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      return Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error fetching live traffic data:", error);
  }
  return [];
};
