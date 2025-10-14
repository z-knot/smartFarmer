/*
  # Initial Schema Setup

  1. Tables
    - `users`: User profiles and authentication
    - `fields`: Agricultural fields information
    - `crops`: Crop types and varieties
    - `field_crops`: Field-crop relationships
    - `alerts`: System alerts and notifications
    - `sensor_readings`: IoT sensor data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  role text CHECK (role IN ('admin', 'agronomist', 'farmer')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Fields table
CREATE TABLE IF NOT EXISTS fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  area decimal NOT NULL,
  soil_type text,
  location geometry(Point, 4326),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crops table
CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  variety text,
  growing_season_days integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Field-Crop relationships
CREATE TABLE IF NOT EXISTS field_crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  crop_id uuid REFERENCES crops(id) ON DELETE CASCADE,
  planting_date date,
  expected_harvest_date date,
  status text CHECK (status IN ('planned', 'growing', 'harvested')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text CHECK (type IN ('critical', 'warning', 'info')),
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sensor readings table
CREATE TABLE IF NOT EXISTS sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  sensor_type text NOT NULL,
  value decimal NOT NULL,
  unit text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read all fields"
  ON fields
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own fields"
  ON fields
  FOR ALL
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can read all crops"
  ON crops
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and agronomists can manage crops"
  ON crops
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'agronomist')
    )
  );

CREATE POLICY "Users can read all field_crops"
  ON field_crops
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage field_crops for their fields"
  ON field_crops
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fields
      WHERE fields.id = field_crops.field_id
      AND fields.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can read alerts for their fields"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fields
      WHERE fields.id = alerts.field_id
      AND fields.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can read sensor data for their fields"
  ON sensor_readings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fields
      WHERE fields.id = sensor_readings.field_id
      AND fields.created_by = auth.uid()
    )
  );

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS fields_created_by_idx ON fields(created_by);
CREATE INDEX IF NOT EXISTS field_crops_field_id_idx ON field_crops(field_id);
CREATE INDEX IF NOT EXISTS field_crops_crop_id_idx ON field_crops(crop_id);
CREATE INDEX IF NOT EXISTS alerts_field_id_idx ON alerts(field_id);
CREATE INDEX IF NOT EXISTS sensor_readings_field_id_idx ON sensor_readings(field_id);
CREATE INDEX IF NOT EXISTS sensor_readings_timestamp_idx ON sensor_readings(timestamp);