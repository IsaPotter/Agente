import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Pelo menos um número")
    .regex(/[^a-zA-Z0-9]/, "Pelo menos um caractere especial"),
});

export type SignUpData = z.infer<typeof signupSchema>;
