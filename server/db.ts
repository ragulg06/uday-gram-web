import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || "actlmcvilznnzxawiyxs";
const supabasePassword = process.env.SUPABASE_DB_PASSWORD;

if (!supabasePassword) {
  throw new Error("SUPABASE_DB_PASSWORD must be set");
}

const encodedPassword = encodeURIComponent(supabasePassword);
const connectionString = `postgresql://postgres:${encodedPassword}@db.${supabaseProjectRef}.supabase.co:5432/postgres`;

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
