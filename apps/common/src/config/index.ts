import { ConfigService } from './service';
import { ConfigSchema } from './types';

export const configService = new ConfigService();

let initialized = false;

// Synchronous wrapper for accessing configuration
export const config = {
  get: <T extends keyof ConfigSchema>(key: T): ConfigSchema[T] => {
    if (!initialized) {
      throw new Error(
        `Configuration not loaded. Ensure the configuration module is initialized before accessing variables. Key: ${key}`,
      );
    }
    return configService.get(key);
  },
};

// Export initialization function for explicit loading (if needed)
export async function initConfig(): Promise<void> {
  if (!initialized) {
    await configService.loadConfig();
    initialized = true;
  }
}
