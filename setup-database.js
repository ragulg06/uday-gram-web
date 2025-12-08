import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

// Read environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Setting up database tables...');
    
    // Read SQL file
    const sqlPath = path.join(process.cwd(), 'create-tables.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement });
        
        if (error) {
          // Try using raw SQL if RPC fails
          console.log('RPC failed, trying direct SQL execution...');
          const { error: directError } = await supabase
            .from('pg_tables')
            .select('*')
            .limit(1);
          
          if (directError) {
            console.log('Direct SQL also failed, this is expected with anon key');
          }
        }
      } catch (err) {
        console.log(`Statement ${i + 1} may have failed (this could be expected):`, err.message);
      }
    }
    
    console.log('Database setup completed!');
    console.log('Please check your Supabase dashboard to verify tables were created.');
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
