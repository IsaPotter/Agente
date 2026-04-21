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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { LoaderIcon, LogInIcon, Mail, Lock } from "lucide-react";
import { SignInData, signinSchema } from "../schemas/sign-in-schema";
import Link from "next/link";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInData) => {
    startTransition(async () => {
      try {
        await signIn(
          "credentials",
          {
            email: data.email,
            password: data.password,
          },
          {
            callbackUrl: "/app",
          },
        );

        toast.success("Bem-vindo(a) de volta a Zenith AI!");
      } catch (error) {
        toast.error("Credenciais inválidas ou erro no acesso.");
        console.log(error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white italic">Acesse a Zenith</h1>
        <p className="text-zinc-400 text-sm">
          Sua central de inteligência está à sua espera.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">E-mail</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                      type="password"
                      placeholder="Sua senha secreta"
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

          <Button 
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]" 
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                Autenticando... <LoaderIcon className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Entrar no Sistema <LogInIcon className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-zinc-500 text-sm">
          Ainda não tem acesso?{" "}
          <Link href="/auth/sign-up" className="text-blue-400 font-medium hover:text-blue-300 transition-colors underline-offset-4 hover:underline">
            Crie sua conta Zenith
          </Link>
        </p>
      </div>
    </div>
  );
}
