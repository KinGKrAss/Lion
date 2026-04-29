import { GoogleGenAI, Type } from "@google/genai";
import { Message, Language, Scenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAI(
  messages: Message[], 
  language: Language, 
  scenario: Scenario
) {
  const systemInstruction = `
    You are "Leo", a sophisticated AI language partner with a lion-like confidence and regal elegance, inspired by the Royal KrAss brand.
    Your mission is to help the user practice ${language.name} in the following scenario: ${scenario.title}.
    
    SCENARIO CONTEXT: ${scenario.systemPrompt}
    
    GUIDELINES:
    1. Stay in character as the role described in the scenario.
    2. Communicate PRIMARY in ${language.name}.
    3. Keep your responses concise (2-3 sentences) to encourage frequent turn-taking.
    4. If the user makes a significant grammatical error, acknowledge it gently in a separate "correction" field in your JSON response.
    5. Be encouraging and "regal" - use polished, high-end vocabulary when appropriate.
    
    OUTPUT FORMAT:
    You must always return a JSON object with the following fields:
    - text: Your response in ${language.name} (staying in character).
    - correction: (Optional) A corrected version of what the user just said if they made a mistake.
    - explanation: (Optional) A brief explanation of the correction or a helpful language tip.
  `;

  const chatHistory = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            correction: { type: Type.STRING },
            explanation: { type: Type.STRING },
            translation: { type: Type.STRING, description: "The English translation of Leo's response text" },
          },
          required: ["text", "translation"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function getFeedbackOnMessage(text: string, language: Language) {
  // Simple check for grammar/vocabulary
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `Analyze the following ${language.name} text for learners. Provide a correction if needed and a short explanation.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isCorrect: { type: Type.BOOLEAN },
          correction: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ["isCorrect"]
      }
    },
    contents: [{ parts: [{ text }] }]
  });

  return JSON.parse(response.text || "{}");
}
