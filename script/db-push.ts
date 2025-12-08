import { execSync } from 'child_process';

const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || "actlmcvilznnzxawiyxs";
const supabasePassword = process.env.SUPABASE_DB_PASSWORD;

if (!supabasePassword) {
  console.error("SUPABASE_DB_PASSWORD must be set");
  process.exit(1);
}

const encodedPassword = encodeURIComponent(supabasePassword);
const connectionString = `postgresql://postgres:${encodedPassword}@db.${supabaseProjectRef}.supabase.co:5432/postgres`;

console.log("Pushing schema to Supabase database...");

try {
  execSync('npx drizzle-kit push', { 
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: connectionString }
  });
  console.log("Schema pushed successfully!");
} catch (error) {
  console.error("Failed to push schema:", error);
  process.exit(1);
}
