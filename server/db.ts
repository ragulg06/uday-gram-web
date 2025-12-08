import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@shared/schema";

const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || "actlmcvilznnzxawiyxs";
const supabasePassword = process.env.SUPABASE_DB_PASSWORD;
const supabaseRegion = process.env.SUPABASE_REGION || "ap-south-1";

if (!supabasePassword) {
  throw new Error("SUPABASE_DB_PASSWORD must be set");
}

const encodedPassword = encodeURIComponent(supabasePassword);
const connectionString = `postgresql://postgres.${supabaseProjectRef}:${encodedPassword}@aws-0-${supabaseRegion}.pooler.supabase.com:6543/postgres`;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
