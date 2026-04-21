"use client";

import Link from "next/link";
import Beams from "@/app/_components/beams-background";
import { Button } from "@/app/_components/ui/button";
import { BrainCircuit, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background 3D Beams */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Beams 
          lightColor="#0ea5e9" 
          beamNumber={15} 
          speed={1.5} 
          noiseIntensity={2} 
        />
      </div>

      {/* Overlay Gradiente para suavizar o fundo */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/20 via-black/40 to-black" />

      {/* Conteúdo Principal (Build Refresh: 2026-04-20) */}
      <div className="container relative z-20 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">

        {/* Hero Title */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          Sua Gestão de Leads com{" "}
          <span className="bg-linear-to-r from-sky-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Zenith AI
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          Zenith AI não é apenas um CRM. É o seu agente inteligente que redefine a gestão de leads, qualificando e priorizando cada oportunidade com precisão absoluta.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button 
            asChild 
            size="lg" 
            className="h-14 bg-blue-600 px-8 text-lg font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20"
          >
            <Link href="/auth/sign-in">
              Entrar na Zenith
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Features Rápidas */}
        <div id="features" className="mt-24 grid w-full max-w-5xl gap-8 sm:grid-cols-3 scroll-mt-20">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
            <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold">IA Visionária</h3>
            <p className="text-sm text-zinc-500">Análises preditivas baseadas em comportamento real.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
            <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Insights em Tempo Real</h3>
            <p className="text-sm text-zinc-500">Decisões baseadas em dados processados instantaneamente.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
            <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold">Arquitetura Zenith</h3>
            <p className="text-sm text-zinc-500">Segurança de nível enterprise em cada interação.</p>
          </div>
        </div>

        {/* Footer Simples */}
        <p className="mt-24 text-sm text-zinc-600">
          © 2026 Zenith AI - Inteligência no Auge
        </p>
      </div>
    </main>
  );
}
