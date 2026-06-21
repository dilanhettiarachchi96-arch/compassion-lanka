-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('clothes', 'food', 'medicine', 'school_supplies')),
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  goal_amount NUMERIC NOT NULL,
  raised_amount NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  children_home_id UUID,
  is_urgent BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  donor_count INTEGER NOT NULL DEFAULT 0,
  days_left INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'LKR',
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'payhere', 'bank_transfer')),
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goods Shipments table
CREATE TABLE IF NOT EXISTS goods_shipments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_country TEXT NOT NULL,
  contents_description TEXT NOT NULL,
  estimated_weight_kg NUMERIC NOT NULL,
  tracking_number TEXT,
  status TEXT NOT NULL CHECK (status IN ('registered', 'in_transit', 'received', 'distributed')) DEFAULT 'registered',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children Homes table
CREATE TABLE IF NOT EXISTS children_homes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  children_count INTEGER NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_needs TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsored Children table
CREATE TABLE IF NOT EXISTS sponsored_children (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  age INTEGER NOT NULL,
  grade INTEGER NOT NULL,
  school_name TEXT NOT NULL,
  district TEXT NOT NULL,
  items_needed TEXT[] NOT NULL DEFAULT '{}',
  sponsorship_cost_lkr NUMERIC NOT NULL,
  is_sponsored BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE goods_shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE children_homes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsored_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for campaigns: public read
CREATE POLICY "Allow public read access to campaigns"
  ON campaigns FOR SELECT
  TO public
  USING (true);

-- Policies for donations: public insert
CREATE POLICY "Allow public insert access to donations"
  ON donations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access to donations for campaign donors"
  ON donations FOR SELECT
  TO public
  USING (true);

-- Policies for goods_shipments: public insert
CREATE POLICY "Allow public insert access to goods_shipments"
  ON goods_shipments FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies for children_homes: public read
CREATE POLICY "Allow public read access to children_homes"
  ON children_homes FOR SELECT
  TO public
  USING (true);

-- Policies for sponsored_children: public read
CREATE POLICY "Allow public read access to sponsored_children"
  ON sponsored_children FOR SELECT
  TO public
  USING (true);

-- Policies for newsletter_subscribers: public insert
CREATE POLICY "Allow public insert access to newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);
