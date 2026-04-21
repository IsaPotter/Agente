import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export interface LeadAnalysis {
  score: number;
  summary: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  nextBestAction: string;
}

export async function analyzeLead(leadData: {
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
}): Promise<LeadAnalysis> {
  if (!apiKey) {
    console.warn("GOOGLE_GENERATIVE_AI_API_KEY não configurada. Usando mock.");
    return {
      score: Math.floor(Math.random() * 40) + 30,
      summary: "Análise simulada (API Key ausente).",
      sentiment: "NEUTRAL",
      nextBestAction: "Configurar API Key para análise real.",
    };
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    Você é o Agente Zenith, uma IA especialista em qualificação de leads B2B e vendas enterprise.
    Sua tarefa é analisar os dados de um novo lead e fornecer uma qualificação precisa.

    Dados do Lead:
    - Nome: ${leadData.name}
    - Empresa: ${leadData.company || "Não informada"}
    - E-mail: ${leadData.email || "Não informado"}
    - Telefone: ${leadData.phone || "Não informado"}

    Instruções:
    1. Atribua um score de 0 a 100 baseado no potencial de negócio (considere o cargo se implícito no nome/empresa, e a relevância da empresa).
    2. Escreva um resumo executivo de 1 frase sobre o perfil.
    3. Identifique o sentimento inicial (POSITIVE, NEUTRAL, NEGATIVE).
    4. Sugira a próxima melhor ação específica para converter esse lead.

    Retorne APENAS um JSON no seguinte formato:
    {
      "score": number,
      "summary": string,
      "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "nextBestAction": string
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as LeadAnalysis;
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err?.status === 429) {
      console.warn("[Zenith AI] Limite de requisições atingido. Usando análise estimada.");
      return {
        score: 65,
        summary: `Lead ${leadData.name} adicionado. Análise completa disponível em breve (limite de API atingido).`,
        sentiment: "NEUTRAL",
        nextBestAction: "Aguardar alguns segundos e realizar uma análise manual inicial.",
      };
    }
    console.error("Erro na chamada ao Gemini:", error);
    return {
      score: 50,
      summary: "Erro ao processar análise inteligente. Verifique a configuração da API Key.",
      sentiment: "NEUTRAL",
      nextBestAction: "Verificar a chave GOOGLE_GENERATIVE_AI_API_KEY no arquivo .env.",
    };
  }
}
