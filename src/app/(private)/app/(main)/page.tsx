import { auth } from "@/services/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Users, TrendingUp, BrainCircuit, MessageSquare } from "lucide-react";
import db from "@/services/database";

export default async function Page() {
  const session = await auth();

  // Buscar estatísticas reais do banco
  const totalLeads = await db.lead.count({
    where: { assignedToId: session?.user?.id }
  });

  const qualifiedLeads = await db.lead.count({
    where: { 
      assignedToId: session?.user?.id,
      status: 'QUALIFIED'
    }
  });

  const totalInsights = await db.agentInsight.count({
    where: { 
      lead: { assignedToId: session?.user?.id }
    }
  });

  const avgScoreRes = await db.lead.aggregate({
    where: { assignedToId: session?.user?.id },
    _avg: { score: true }
  });

  const avgScore = Math.round(avgScoreRes._avg.score || 0);

  const stats = [
    {
      title: "Total de Leads",
      value: totalLeads.toString(),
      description: "Leads cadastrados no sistema",
      icon: Users,
    },
    {
      title: "AI Quality Score",
      value: `${avgScore}%`,
      description: "Média de qualificação da IA",
      icon: BrainCircuit,
    },
    {
      title: "Leads Qualificados",
      value: qualifiedLeads.toString(),
      description: "Prontos para fechamento",
      icon: TrendingUp,
    },
    {
      title: "Total de Insights",
      value: totalInsights.toString(),
      description: "Análises automáticas feitas",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta, {session?.user.name}. Aqui está o resumo do seu CRM.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico de engajamento será exibido aqui
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Insights Recentes do Agente</CardTitle>
            <CardDescription>Ultimas análises automáticas feitas pela IA.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[200px] text-muted-foreground italic text-sm text-center px-4">
              {totalInsights > 0 
                ? "O Agente já está gerando insights! Abra o perfil de um lead para ver os detalhes."
                : '"O Agente ainda não processou interações. Adicione alguns leads para começar a ver insights."'
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
