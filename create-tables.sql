-- Create all tables for PM-AJAY Portal
-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'district',
  mobile TEXT,
  email TEXT,
  state TEXT,
  district TEXT,
  last_login TIMESTAMP
);

-- Villages table
CREATE TABLE IF NOT EXISTS villages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  block TEXT NOT NULL,
  gram_panchayat TEXT NOT NULL,
  village_name TEXT NOT NULL,
  village_code TEXT NOT NULL UNIQUE,
  selection_year TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  total_population INTEGER,
  sc_population INTEGER,
  sc_percentage REAL,
  total_households INTEGER,
  latitude TEXT,
  longitude TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Committee Members
CREATE TABLE IF NOT EXISTS committee_members (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  mobile_no TEXT,
  email TEXT,
  address TEXT,
  remarks TEXT
);

-- Infrastructure Indicators (Format II)
CREATE TABLE IF NOT EXISTS infrastructure_indicators (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  domain TEXT NOT NULL,
  indicator TEXT NOT NULL,
  current_status TEXT,
  gap_description TEXT,
  action_plan TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Household Surveys (Format IIIA)
CREATE TABLE IF NOT EXISTS household_surveys (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  household_number TEXT NOT NULL,
  head_name TEXT NOT NULL,
  family_members INTEGER,
  sc_st BOOLEAN DEFAULT FALSE,
  income_source TEXT,
  annual_income REAL,
  land_holding REAL,
  housing_type TEXT,
  electrification BOOLEAN DEFAULT FALSE,
  drinking_water_source TEXT,
  sanitation_facility BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Works table
CREATE TABLE IF NOT EXISTS works (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  work_name TEXT NOT NULL,
  work_type TEXT NOT NULL,
  agency_name TEXT,
  estimated_cost REAL,
  start_date DATE,
  completion_date DATE,
  status TEXT DEFAULT 'pending',
  progress_percentage REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  contact_person TEXT,
  mobile TEXT,
  email TEXT,
  address TEXT,
  registration_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Progress Reports
CREATE TABLE IF NOT EXISTS progress_reports (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  format_type TEXT NOT NULL,
  report_data JSONB,
  submission_date DATE,
  status TEXT DEFAULT 'draft',
  submitted_by TEXT,
  verified_by TEXT,
  verification_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- VDP Documents
CREATE TABLE IF NOT EXISTS vdp_documents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT,
  file_path TEXT,
  file_size INTEGER,
  upload_date TIMESTAMP DEFAULT NOW(),
  uploaded_by TEXT,
  status TEXT DEFAULT 'active'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_villages_village_code ON villages(village_code);
CREATE INDEX IF NOT EXISTS idx_villages_verification_status ON villages(verification_status);
CREATE INDEX IF NOT EXISTS idx_committee_members_village_id ON committee_members(village_id);
CREATE INDEX IF NOT EXISTS idx_infrastructure_indicators_village_id ON infrastructure_indicators(village_id);
CREATE INDEX IF NOT EXISTS idx_household_surveys_village_id ON household_surveys(village_id);
CREATE INDEX IF NOT EXISTS idx_works_village_id ON works(village_id);
CREATE INDEX IF NOT EXISTS idx_works_status ON works(status);
CREATE INDEX IF NOT EXISTS idx_progress_reports_village_id ON progress_reports(village_id);
CREATE INDEX IF NOT EXISTS idx_vdp_documents_village_id ON vdp_documents(village_id);
