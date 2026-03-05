-- ============================================================
-- WBC MUAY THAI EGYPT - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (linked to Supabase Auth)
-- ============================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'public' CHECK (role IN ('super_admin', 'admin', 'fighter', 'gym', 'public')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WEIGHT CLASSES
-- ============================================================
CREATE TABLE weight_classes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  max_weight DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO weight_classes (name, name_ar, max_weight) VALUES
  ('Mini Flyweight', 'ميني فلاي', 47.627),
  ('Light Flyweight', 'لايت فلاي', 49.000),
  ('Flyweight', 'فلاي', 50.802),
  ('Super Flyweight', 'سوبر فلاي', 52.163),
  ('Bantamweight', 'بانتام', 53.525),
  ('Super Bantamweight', 'سوبر بانتام', 55.338),
  ('Featherweight', 'فيذر', 57.152),
  ('Super Featherweight', 'سوبر فيذر', 58.967),
  ('Lightweight', 'لايت', 61.235),
  ('Super Lightweight', 'سوبر لايت', 63.503),
  ('Welterweight', 'ويلتر', 66.678),
  ('Super Welterweight', 'سوبر ويلتر', 69.853),
  ('Middleweight', 'ميدل', 72.574),
  ('Super Middleweight', 'سوبر ميدل', 76.200),
  ('Light Heavyweight', 'لايت هيفي', 79.379),
  ('Cruiserweight', 'كروزر', 86.183),
  ('Heavyweight', 'هيفي', 90.719),
  ('Super Heavyweight', 'سوبر هيفي', 999.000);

-- ============================================================
-- GYMS
-- ============================================================
CREATE TABLE gyms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  city TEXT NOT NULL,
  governorate TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  head_coach TEXT,
  license_number TEXT UNIQUE,
  license_expiry DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'expired')),
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FIGHTERS
-- ============================================================
CREATE TABLE fighters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  full_name_en TEXT,
  date_of_birth DATE,
  nationality TEXT DEFAULT 'Egyptian',
  weight_class_id INTEGER REFERENCES weight_classes(id),
  gym_id UUID REFERENCES gyms(id),
  license_number TEXT UNIQUE,
  license_expiry DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'retired')),
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  wbc_points INTEGER DEFAULT 0,
  national_rank INTEGER,
  african_rank INTEGER,
  world_rank INTEGER,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EVENTS (بطولات)
-- ============================================================
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  event_date DATE NOT NULL,
  city TEXT NOT NULL,
  venue TEXT,
  event_type TEXT DEFAULT 'national' CHECK (event_type IN ('national', 'regional', 'international', 'open')),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  max_fighters INTEGER,
  description TEXT,
  poster_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MATCHES (نتائج المباريات)
-- ============================================================
CREATE TABLE matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  fighter_red_id UUID REFERENCES fighters(id),
  fighter_blue_id UUID REFERENCES fighters(id),
  weight_class_id INTEGER REFERENCES weight_classes(id),
  winner_id UUID REFERENCES fighters(id),
  result_type TEXT CHECK (result_type IN ('KO', 'TKO', 'Decision', 'Draw', 'NC', 'DQ')),
  round_ended INTEGER,
  is_title_fight BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COACHES & REFEREES
-- ============================================================
CREATE TABLE officials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('coach', 'referee', 'judge', 'both')),
  license_grade TEXT CHECK (license_grade IN ('A', 'B', 'C', 'international')),
  gym_id UUID REFERENCES gyms(id),
  license_number TEXT,
  license_expiry DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  phone TEXT,
  governorate TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RANKINGS HISTORY
-- ============================================================
CREATE TABLE rankings_history (
  id SERIAL PRIMARY KEY,
  fighter_id UUID REFERENCES fighters(id),
  weight_class_id INTEGER REFERENCES weight_classes(id),
  national_rank INTEGER,
  african_rank INTEGER,
  world_rank INTEGER,
  wbc_points INTEGER,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fighters ENABLE ROW LEVEL SECURITY;
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE officials ENABLE ROW LEVEL SECURITY;

-- Public can read fighters, events, gyms, rankings
CREATE POLICY "Public read fighters" ON fighters FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read gyms" ON gyms FOR SELECT USING (true);
CREATE POLICY "Public read matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public read weight_classes" ON weight_classes FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins full access fighters" ON fighters
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')));
CREATE POLICY "Admins full access events" ON events
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')));
CREATE POLICY "Admins full access gyms" ON gyms
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')));
CREATE POLICY "Admins full access officials" ON officials
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin')));

-- Fighters can read their own profile
CREATE POLICY "Fighters read own" ON fighters
  FOR SELECT USING (profile_id = auth.uid());

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fighters_updated_at BEFORE UPDATE ON fighters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER gyms_updated_at BEFORE UPDATE ON gyms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SAMPLE DATA
-- ============================================================
INSERT INTO gyms (name, name_ar, city, governorate, head_coach, license_number, license_expiry, status) VALUES
  ('Al-Ahly Combat Sports', 'الأهلي للفنون القتالية', 'Cairo', 'القاهرة', 'Ahmed El-Said', 'WBC-EG-GYM-001', '2026-01-01', 'active'),
  ('Nile Muay Thai Academy', 'أكاديمية النيل للمواي تاي', 'Alexandria', 'الإسكندرية', 'Khaled Fathi', 'WBC-EG-GYM-002', '2026-03-01', 'active'),
  ('Zamalek Combat Club', 'الزمالك للفنون القتالية', 'Cairo', 'القاهرة', 'Hani Mahrous', 'WBC-EG-GYM-003', '2026-06-01', 'active');
