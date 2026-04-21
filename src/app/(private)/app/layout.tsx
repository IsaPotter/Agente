import { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/app/_components/ui/separator";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">App</span>
            <span className="text-sm font-medium text-muted-foreground">/</span>
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
