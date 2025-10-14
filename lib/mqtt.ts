import * as mqtt from 'mqtt';
import { supabase } from './supabase';

class MQTTClient {
  private static instance: MQTTClient;
  private client: mqtt.Client | null = null;
  private subscribers: Map<string, Function[]> = new Map();

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): MQTTClient {
    if (!MQTTClient.instance) {
      MQTTClient.instance = new MQTTClient();
    }
    return MQTTClient.instance;
  }

  public connect(brokerUrl: string, options: mqtt.IClientOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.client = mqtt.connect(brokerUrl, {
          ...options,
          keepalive: 60,
          reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
          console.log('Connected to MQTT broker');
          resolve();
        });

        this.client.on('error', (error) => {
          console.error('MQTT connection error:', error);
          reject(error);
        });

        this.client.on('message', async (topic, message) => {
          try {
            const data = JSON.parse(message.toString());
            
            // Store sensor reading in database
            if (topic.startsWith('sensor/')) {
              await this.storeSensorReading(data);
            }

            // Notify subscribers
            const subscribers = this.subscribers.get(topic) || [];
            subscribers.forEach(callback => callback(data));
          } catch (error) {
            console.error('Error processing MQTT message:', error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public subscribe(topic: string, callback: Function): void {
    if (!this.client) {
      throw new Error('MQTT client not connected');
    }

    this.client.subscribe(topic, (error) => {
      if (error) {
        console.error(`Error subscribing to ${topic}:`, error);
        return;
      }

      const subscribers = this.subscribers.get(topic) || [];
      subscribers.push(callback);
      this.subscribers.set(topic, subscribers);
    });
  }

  public publish(topic: string, message: any): void {
    if (!this.client) {
      throw new Error('MQTT client not connected');
    }

    this.client.publish(topic, JSON.stringify(message));
  }

  private async storeSensorReading(data: any) {
    try {
      const { error } = await supabase.from('sensor_readings').insert({
        field_id: data.fieldId,
        sensor_type: data.type,
        value: data.value,
        unit: data.unit,
        timestamp: new Date().toISOString()
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing sensor reading:', error);
    }
  }

  public disconnect(): void {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.subscribers.clear();
    }
  }
}

export const mqttClient = MQTTClient.getInstance();