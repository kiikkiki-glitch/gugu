
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (destination: string, weather: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Berikan saran singkat dalam Bahasa Indonesia untuk perjalanan ke ${destination} dengan kondisi cuaca ${weather}. Fokus pada pemilihan kendaraan (Motor, Mobil, atau SUV) dan perlengkapan yang harus dibawa.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            recommendedVehicleType: { type: Type.STRING, description: "Motor, Mobil, atau SUV" },
            itemsToBring: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["advice", "recommendedVehicleType", "itemsToBring"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return {
      advice: "Nikmati perjalanan Anda! Pastikan kendaraan dalam kondisi prima.",
      recommendedVehicleType: "Mobil",
      itemsToBring: ["Air minum", "Peta"]
    };
  }
};

export const getNearbyFacilities = async (destination: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Berikan rekomendasi fasilitas di sekitar ${destination}, Indonesia. Cari 2 Hotel, 2 Restoran/Rumah Makan, 2 Tempat Ibadah (Masjid/Gereja), dan 2 POM Bensin (SPBU).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              }
            },
            restaurants: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              }
            },
            worshipPlaces: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              }
            },
            gasStations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["name", "description"]
              }
            }
          },
          required: ["hotels", "restaurants", "worshipPlaces", "gasStations"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Facilities Error:", error);
    return {
      hotels: [],
      restaurants: [],
      worshipPlaces: [],
      gasStations: []
    };
  }
};
