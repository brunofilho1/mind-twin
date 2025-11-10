import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export async function analyzeWithAI(idea: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Prompt otimizado para gastar menos tokens e usar busca nativa do Gemini
    const prompt = `
    Search the internet for: "${idea}"

    Do not encourage anything illegal or grotesque.

    Respond in the same language used in the user's query.

    Start by saying similar things like "This idea already/doesn't exist etc...", write your answer as a single short paragraph (no numbered or bulleted items, no line breaks, no periods between sentences, just a natural continuous text) including:
    1. Whether something similar exists (Yes/No/Partially, and name existing ones if any)
    2. What could be the possible differentiator (if similar ones exist, start with "a differentiator from existing ones could be...", if none exist, clearly state it is a unique idea)
    3. Whether it is worth developing (Yes/No, explain briefly why)
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text || "Erro ao analisar";
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Não foi possível analisar essa ideia no momento. Problema inesperado da aplicação 😵‍💫";
  }
}
