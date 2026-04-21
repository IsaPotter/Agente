"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { createLeadAction } from "../_actions/create-lead-action";

const leadSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function CreateLeadSheet() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  async function onSubmit(values: LeadFormValues) {
    setIsSubmitting(true);
    try {
      await createLeadAction(values);
      toast.success("Lead cadastrado com sucesso!");
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao cadastrar lead. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Lead
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[440px] bg-zinc-950 border-white/5 text-white">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold italic tracking-tight text-white">Novo Lead</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Insira os dados do prospect. A Neli AI fará uma análise imediata.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Nome Completo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: João Silva" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
                      {...field} 
                    />
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
                  <FormLabel className="text-zinc-300">E-mail</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="joao@empresa.com" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Empresa</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome da organização" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Telefone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(11) 99999-9999" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400 text-xs" />
                </FormItem>
              )}
            />

            <SheetFooter className="pt-6">
              <Button 
                type="submit" 
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Cadastrar e Analisar com Neli"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
