import { config } from '../config';

/**
 * CORS -------------------------------------
 */
export const ALL_ORIGINS_ALLOWED_ROUTES: string[] = ['/stripe-session-complete'];

/**
 * Logger -------------------------------------
 */
export const isLocalDevMode = (): boolean => ['dev', 'development'].includes(config.get('NODE_ENV'));

export const isTestMode = (): boolean => config.get('NODE_ENV') === 'test';
