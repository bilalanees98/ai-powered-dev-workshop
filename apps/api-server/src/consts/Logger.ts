import config from 'config/config';

export const IS_LOCAL_DEV_MODE = config.environment === 'development' || config.environment === 'dev';
export const IS_TEST_MODE = config.environment === 'test';
