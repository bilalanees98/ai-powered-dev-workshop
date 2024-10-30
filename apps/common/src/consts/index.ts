import config from '../config';

/**
 * CORS -------------------------------------
 */
export const ALL_ORIGINS_ALLOWED_ROUTES: string[] = ['/stripe-session-complete'];

/**
 * domain -- has lots of constants - stored in a separate module
 */

/**
 * Logger -------------------------------------
 */
export const IS_LOCAL_DEV_MODE = config.environment === 'development' || config.environment === 'dev';
export const IS_TEST_MODE = config.environment === 'test';
