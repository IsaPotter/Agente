import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// FORCE RECOMPILE: 2026-04-18 11:55
// Garante que a URL esteja no ambiente
const DEFAULT_URL = "file:./dev.db";
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = DEFAULT_URL;
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const createPrismaClient = () => {
  try {
    const dbUrl = process.env.DATABASE_URL || DEFAULT_URL;
    
    console.log("🛠️ [Database] Inicializando adaptador com URL:", dbUrl);

    // No Prisma 7, o adaptador factory PREVISA receber um objeto com a propriedade 'url'
    const adapterConfig = {
      url: dbUrl
    };

    const adapter = new PrismaBetterSqlite3(adapterConfig);
    
    return new PrismaClient({ 
      adapter
    });
  } catch (error) {
    console.error("🚨 [Database] Falha crítica na inicialização:", error);
    throw error;
  }
};

const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
