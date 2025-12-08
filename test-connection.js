import { config } from 'dotenv';
config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key present:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test if we can query the users table
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Query error:', error);
    } else {
      console.log('Connection successful! Users count:', data?.length || 0);
    }
    
    // Try to get the admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('username', 'admin')
      .single();
    
    if (adminError) {
      console.log('Admin user not found:', adminError.message);
    } else {
      console.log('Admin user found:', adminUser?.username);
    }
    
  } catch (err) {
    console.error('Connection test failed:', err.message);
  }
}

testConnection();
