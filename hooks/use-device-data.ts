import { useState, useEffect } from 'react';
import { Device, getDevices, getDeviceById } from '@/lib/iot';
import { mqttClient } from '@/lib/mqtt';

export function useDeviceData(deviceId?: string) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (deviceId) {
          const deviceData = await getDeviceById(deviceId);
          setDevice(deviceData);
        } else {
          const devicesData = await getDevices();
          setDevices(devicesData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [deviceId]);

  useEffect(() => {
    if (!deviceId) return;

    // Subscribe to device updates
    const topic = `device/${deviceId}/status`;
    mqttClient.subscribe(topic, (data: any) => {
      setDevice(prev => prev ? { ...prev, ...data } : null);
    });

    return () => {
      // Cleanup subscription
      mqttClient.disconnect();
    };
  }, [deviceId]);

  return {
    devices,
    device,
    loading,
    error
  };
}