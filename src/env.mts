type Env = 'MQTT_PORT' | 'MQTT_USER' | 'MQTT_PASSWORD';

export function env(key: Env, defaultValue?: string): string {
  return (process.env?.[key] as string) ?? defaultValue;
}

export function envNum(key: Env, defaultValue?: number): number {
  return +(process.env?.[key] as string) ?? defaultValue;
}
