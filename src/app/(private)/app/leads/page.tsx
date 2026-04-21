import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_components/ui/card";
import { CreateLeadSheet } from "./_components/create-lead-sheet";
import db from "@/services/database";
import { auth } from "@/services/auth";

export default async function LeadsPage() {
  const session = await auth();
  
  // Buscar leads reais do banco de dados
  const leads = await db.lead.findMany({
    where: {
      assignedToId: session?.user?.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie e qualifique seus potenciais clientes aqui.
          </p>
        </div>
        <CreateLeadSheet />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads por nome ou empresa..."
                className="pl-8 max-w-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">AI Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">
                      <div>
                        {lead.name}
                        <div className="text-xs text-muted-foreground font-normal">
                          {lead.email || "Sem e-mail"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === "QUALIFIED"
                            ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
                            : ""
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 font-mono font-bold">
                        <div
                          className="h-2 w-12 rounded-full bg-muted overflow-hidden"
                          title={`${lead.score || 0}%`}
                        >
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${lead.score || 0}%` }}
                          />
                        </div>
                        <span className={(lead.score || 0) > 70 ? "text-primary" : "text-muted-foreground"}>
                          {lead.score || 0}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Nenhum lead encontrado. Comece adicionando um no botão acima!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
