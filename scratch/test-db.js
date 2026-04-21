
const { PrismaClient } = require("./src/generated/prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const Database = require("better-sqlite3");
const path = require("path");

async function testConnection() {
  try {
    const dbUrl = "file:./dev.db";
    const relativePath = dbUrl.replace(/^file:/, "");
    const dbPath = path.resolve(process.cwd(), relativePath);
    console.log("Database path:", dbPath);

    const sqlite = new Database(dbPath);
    const adapter = new PrismaBetterSqlite3(sqlite);
    const db = new PrismaClient({ adapter });

    console.log("Testing query...");
    const users = await db.user.findMany();
    console.log("Users count:", users.length);
    await db.$disconnect();
    console.log("Connection successful!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();
