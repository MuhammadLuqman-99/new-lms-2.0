import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const streamGeminiResponse = async (
  modelId: string,
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const ai = getAI();
    
    // Convert history to Gemini format
    // Gemini 2.5/3 expects a clean conversation history
    const chat = ai.chats.create({
      model: modelId,
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });

    const responseStream = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n*Error generating response. Please check your API configuration.*");
  }
};