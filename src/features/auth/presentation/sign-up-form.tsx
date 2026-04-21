"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { LoaderIcon, User, Mail, Lock, UserPlus, CheckCircle2 } from "lucide-react";
import { SignUpData, signupSchema } from "../schemas/sign-up-schema";
import { signUpAction } from "@/features/auth/server/sign-up-action";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpData) => {
    startTransition(async () => {
      try {
        const result = await signUpAction(data);
        
        if (result.success) {
          toast.success("Conta criada com sucesso! Boas-vindas a Zenith AI.");
          router.push("/auth/sign-in");
        } else {
          toast.error(result.error || "Erro ao criar conta. Tente novamente.");
        }
      } catch (error) {
        toast.error("Erro inesperado no servidor. Tente novamente mais tarde.");
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white italic">Filipe-se a Zenith</h1>
        <p className="text-zinc-400 text-sm">
          Comece sua jornada com o CRM movido a inteligência.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Nome Completo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                      placeholder="Como podemos te chamar?"
                      className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-zinc-600 focus:border-blue-500/50"
                      disabled={isPending}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-rose-400 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Seu melhor E-mail</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                      type="email"
                      placeholder="seu@melhor.com"
                      className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-zinc-600 focus:border-blue-500/50"
                      disabled={isPending}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-rose-400 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const val = field.value || "";
              const requirements = [
                { label: "Mínimo 8 caracteres", met: val.length >= 8 },
                { label: "Pelo menos um número", met: /[0-9]/.test(val) },
                { label: "Uma letra maiúscula", met: /[A-Z]/.test(val) },
                { label: "Um caractere especial", met: /[^a-zA-Z0-9]/.test(val) },
              ];

              return (
                <FormItem>
                  <FormLabel className="text-zinc-300">Crie sua Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input
                        type="password"
                        placeholder="Crie uma senha forte"
                        className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-zinc-600 focus:border-blue-500/50"
                        disabled={isPending}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="mt-3 grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                    {requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {req.met ? (
                          <div className="p-0.5 bg-emerald-500/20 rounded-full">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="p-0.5 bg-white/5 rounded-full">
                            <div className="h-3 w-3 rounded-full border border-white/20" />
                          </div>
                        )}
                        <span className={`text-[10px] ${req.met ? "text-emerald-400 font-medium" : "text-zinc-500"}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              );
            }}
          />

          <Button 
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]" 
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                Processando acesso... <LoaderIcon className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Criar Minha Conta <UserPlus className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-zinc-500 text-sm">
          Já faz parte da Zenith?{" "}
          <Link href="/auth/sign-in" className="text-blue-400 font-medium hover:text-blue-300 transition-colors underline-offset-4 hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
