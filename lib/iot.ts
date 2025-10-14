import { supabase } from './supabase';

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'warning' | 'offline';
  battery: number;
  signal: number;
  lastReading: string;
  firmware: string;
}

export interface SensorReading {
  id: string;
  fieldId: string;
  sensorType: string;
  value: number;
  unit: string;
  timestamp: string;
}

export async function getDevices(): Promise<Device[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .order('name');

  if (error) {
    throw error;
  }

  return data;
}

export async function getDeviceById(id: string): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateDevice(id: string, updates: Partial<Device>): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getSensorReadings(
  fieldId: string,
  sensorType: string,
  startDate: string,
  endDate: string
): Promise<SensorReading[]> {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('field_id', fieldId)
    .eq('sensor_type', sensorType)
    .gte('timestamp', startDate)
    .lte('timestamp', endDate)
    .order('timestamp');

  if (error) {
    throw error;
  }

  return data;
}

export async function getLatestReadings(fieldId: string): Promise<SensorReading[]> {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('field_id', fieldId)
    .order('timestamp', { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  return data;
}