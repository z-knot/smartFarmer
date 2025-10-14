import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables = {
  users: {
    id: string;
    full_name: string;
    role: 'admin' | 'agronomist' | 'farmer';
    created_at: string;
    updated_at: string;
  };
  fields: {
    id: string;
    name: string;
    area: number;
    soil_type: string;
    location: any; // PostGIS geometry type
    created_by: string;
    created_at: string;
    updated_at: string;
  };
  crops: {
    id: string;
    name: string;
    variety: string;
    growing_season_days: number;
    created_at: string;
    updated_at: string;
  };
  field_crops: {
    id: string;
    field_id: string;
    crop_id: string;
    planting_date: string;
    expected_harvest_date: string;
    status: 'planned' | 'growing' | 'harvested';
    created_at: string;
    updated_at: string;
  };
  alerts: {
    id: string;
    title: string;
    message: string;
    type: 'critical' | 'warning' | 'info';
    field_id: string;
    status: 'active' | 'resolved';
    created_at: string;
    updated_at: string;
  };
  sensor_readings: {
    id: string;
    field_id: string;
    sensor_type: string;
    value: number;
    unit: string;
    timestamp: string;
  };
};