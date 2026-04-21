import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";
import Provider from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
  title: "Zenith AI | Inteligência no Auge",
  description: "Seu agente inteligente que redefine a gestão de leads com precisão absoluta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
