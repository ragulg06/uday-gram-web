import { config } from 'dotenv';
config(); // Load environment variables

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@shared/schema";

// Use DATABASE_URL from environment (configured for Supabase)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be set in environment variables");
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
