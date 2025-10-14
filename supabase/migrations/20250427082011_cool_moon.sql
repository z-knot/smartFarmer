/*
  # Add IoT Devices Table

  1. New Tables
    - `devices`: IoT device information and status
    
  2. Security
    - Enable RLS on devices table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  status text CHECK (status IN ('online', 'warning', 'offline')),
  battery integer,
  signal integer,
  firmware_version text,
  last_reading timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read all devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage devices for their fields"
  ON devices
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fields
      WHERE fields.id = devices.field_id
      AND fields.created_by = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS devices_field_id_idx ON devices(field_id);
CREATE INDEX IF NOT EXISTS devices_status_idx ON devices(status);