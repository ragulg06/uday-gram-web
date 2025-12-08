import { execSync } from 'child_process';

const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || "actlmcvilznnzxawiyxs";
const supabasePassword = process.env.SUPABASE_DB_PASSWORD;
const supabaseRegion = process.env.SUPABASE_REGION || "ap-south-1";

if (!supabasePassword) {
  console.error("SUPABASE_DB_PASSWORD must be set");
  process.exit(1);
}

const encodedPassword = encodeURIComponent(supabasePassword);
const connectionString = `postgresql://postgres.${supabaseProjectRef}:${encodedPassword}@aws-0-${supabaseRegion}.pooler.supabase.com:5432/postgres`;

console.log("Pushing schema to Supabase database via session pooler (port 5432)...");

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
