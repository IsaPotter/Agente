"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BrainCircuit, 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Play,
  RotateCcw,
  Sparkles,
  BarChart3,
  Search
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";

// Mock data para a demo
const MOCK_LEADS = [
  { id: 1, name: "Empresa SolarTech", company: "Energia Renovável", score: 92, status: "Quente", time: "2 min atrás" },
  { id: 2, name: "Agência Digital XP", company: "Marketing", score: 45, status: "Frio", time: "15 min atrás" },
  { id: 3, name: "Consultoria Prime", company: "Finanças", score: 78, status: "Morno", time: "1 hora atrás" },
];

export default function DemoPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showInsight, setShowInsight] = useState(false);

  const startAnalysisDemo = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setShowInsight(false);
  };

  useEffect(() => {
    if (isAnalyzing && analysisProgress < 100) {
      const timer = setTimeout(() => setAnalysisProgress(prev => prev + 5), 100);
      return () => clearTimeout(timer);
    } else if (analysisProgress === 100) {
      setIsAnalyzing(false);
      setShowInsight(true);
    }
  }, [isAnalyzing, analysisProgress]);

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-outfit)]">
      {/* Navbar simplificada */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight italic">Zenith AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 animate-pulse">
              Modo Demonstração
            </Badge>
            <Link href="/auth/sign-up">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Criar Conta Real</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Hero Section da Demo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Painel de Controle</h1>
            <p className="text-zinc-400 mt-2">Visão geral do sistema em tempo real.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5" onClick={() => window.location.reload()}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar Dados
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total de Leads", value: "1.284", icon: Users, color: "text-blue-400" },
            { label: "Análises Hoje", value: "56", icon: Sparkles, color: "text-sky-400" },
            { label: "Qualidade Média", value: "78%", icon: TrendingUp, color: "text-emerald-400" },
            { label: "Convertidos", value: "32", icon: CheckCircle2, color: "text-amber-400" },
          ].map((stat, i) => (
            <Card key={i} className="bg-zinc-950 border-white/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção Principal: Tabela e Simulador */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabela de Leads */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-950 border-white/5 overflow-hidden">
              <CardHeader className="border-b border-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Leads Recentes</CardTitle>
                  <Search className="h-4 w-4 text-zinc-500" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] text-zinc-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Nome / Empresa</th>
                        <th className="px-6 py-4 font-semibold text-center">IA Score</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Captura</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {MOCK_LEADS.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{lead.name}</div>
                            <div className="text-xs text-zinc-500">{lead.company}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm border-2 ${
                              lead.score > 80 ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" :
                              lead.score > 60 ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                              "border-rose-500/50 text-rose-400 bg-rose-500/10"
                            }`}>
                              {lead.score}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              lead.status === "Quente" ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10" :
                              lead.status === "Morno" ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/10" :
                              "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/10"
                            } border-none`}>
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-500">{lead.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Simulador Interativo de IA */}
          <div className="space-y-6">
            <Card className="bg-zinc-950 border-blue-500/20 shadow-[0_0_40px_-15px_rgba(59,130,246,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">Simulador de Insights</CardTitle>
                <CardDescription className="text-zinc-500">
                  Veja a Zenith AI analisando um lead em tempo real.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isAnalyzing && !showInsight ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-sm text-zinc-400 px-4">
                      Clique no botão abaixo para iniciar uma análise simulada de um lead de alta intenção.
                    </p>
                    <Button onClick={startAnalysisDemo} className="w-full bg-blue-600 hover:bg-blue-700">
                      Iniciar Simulação <Play className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : isAnalyzing ? (
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>Analisando perfil corporativo...</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-100 ease-out"
                          style={{ width: `${analysisProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-3 w-full bg-white/5 rounded animate-pulse delay-${i * 150}`} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-700">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                      <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500">Lead Analisado</div>
                        <div className="text-white font-bold">Inovatech Indústria</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <div className="text-xs font-bold text-blue-400 uppercase mb-1">Diagnóstico da Zenith</div>
                        <p className="text-sm text-zinc-300 leading-relaxed italic">
                          "O prospect demonstrou alta intenção ao visitar a página de preços 3x hoje. Sugiro abordagem imediata focada em escalabilidade."
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-white/5 rounded text-center">
                          <div className="text-[10px] text-zinc-500 lowercase">Score</div>
                          <div className="text-lg font-bold text-white">98</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded text-center">
                          <div className="text-[10px] text-zinc-500 lowercase">Prioridade</div>
                          <div className="text-lg font-bold text-emerald-400">P1</div>
                        </div>
                      </div>
                    </div>

                    <Button onClick={startAnalysisDemo} variant="outline" className="w-full border-white/10 hover:bg-white/5">
                      Repetir Análise <RotateCcw className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="p-6 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl space-y-4 shadow-lg">
              <h3 className="font-bold text-lg leading-tight">Gostou do que viu?</h3>
              <p className="text-sm text-white/80">
                A configuração completa leva menos de 5 minutos. Comece a fechar mais negócios agora.
              </p>
              <Link href="/auth/sign-up" className="block">
                <Button className="w-full bg-white text-blue-700 hover:bg-zinc-100 font-bold">
                  Criar Minha Conta Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center text-zinc-600 text-sm">
        © 2026 Zenith AI - Laboratório de Demonstração
      </footer>
    </div>
  );
}
