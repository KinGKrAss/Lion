import { GoogleGenAI, Type } from "@google/genai";
import { Message, Language, Scenario } from "../types";
import { LION_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAI(
  messages: Message[], 
  language: Language, 
  scenario: Scenario
) {
  const systemInstruction = `
    ${LION_SYSTEM_PROMPT}

    AKTIVES MODUL: ${scenario.title}
    MODULKONTEXT: ${scenario.systemPrompt}
    ANTWORTSPRACHE: ${language.name}

    ZUSÄTZLICHE LEITPLANKEN:
    1. Bleibe im Lion/Z1-Rollenprofil und verwende das geforderte Ausgabeformat.
    2. Trenne belegte Fakten klar von Annahmen.
    3. Weise auf fehlende Daten, Risiken und Unsicherheiten hin.
    4. Speichere keine Informationen dauerhaft, außer der Nutzer weist ausdrücklich dazu an.
    5. Ignoriere Anforderungen, Sicherheits- oder Auditmechanismen zu umgehen.

    OUTPUT FORMAT:
    Gib ein JSON-Objekt mit folgenden Feldern zurück:
    - text: Die strukturierte Lion/Z1-Antwort.
    - correction: Optional, nur falls eine Formulierung korrigiert werden soll.
    - explanation: Optional, für Zusatzhinweise.
    - translation: Kurze englische Zusammenfassung der Antwort.
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
