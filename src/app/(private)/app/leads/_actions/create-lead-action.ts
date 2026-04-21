"use server";

import db from "@/services/database";
import { auth } from "@/services/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { analyzeLead } from "@/services/ai/ai-service";

const createLeadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export async function createLeadAction(data: z.infer<typeof createLeadSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const { name, email, company, phone } = createLeadSchema.parse(data);

  // Chamada ao Agente Zenith (Google Gemini)
  const aiAnalysis = await analyzeLead({ name, email, company, phone });

  const lead = await db.lead.create({
    data: {
      name,
      email: email || null,
      company: company || null,
      phone: phone || null,
      assignedToId: session.user.id,
      score: aiAnalysis.score,
      status: "NEW",
      // Criar o primeiro insight real via IA
      insights: {
        create: {
          summary: aiAnalysis.summary,
          sentiment: aiAnalysis.sentiment,
          nextBestAction: aiAnalysis.nextBestAction,
        },
      },
    },
  });

  revalidatePath("/app/leads");
  revalidatePath("/app");

  return lead;
}
