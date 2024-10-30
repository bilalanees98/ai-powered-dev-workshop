import Joi from 'joi';

import 'dotenv/config';

const uriSchema = Joi.array().items(
  Joi.string().uri({
    scheme: ['http', 'https'],
    allowRelative: true,
  }),
);
const emailSchema = Joi.array().items(Joi.string().email());

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
    PORT: Joi.number().default(80),
    ALLOWED_ORIGINS: uriSchema.min(1).unique(),
    APP_DOMAIN: Joi.string().required().description('app domain'),
    NETWORK: Joi.string().required().valid('testnet', 'mainnet').required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required().description('database host, i.e db container internal ip'),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_LIMIT: Joi.number().default(10),
    DATABASE_CONNECTION_NAME: Joi.string().default('default'),
    DATABASE_SYNC_ON: Joi.boolean().default(false).description('sync entities with schema only for dev env'),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_ENDPOINT_SECRET: Joi.string().required(),
    STRIPE_PRODUCT_IMAGE_URL: Joi.string().uri().required(),
    DOMAIN_COST_USD: Joi.number().required(),
    TEMP_WALLET_PASSWORD: Joi.string()
      .required()
      .description('the password assigned to each wallet in our pool of wallets'),
    JWT_SECRET: Joi.string().required().description('the secret key used for generating jwt tokens'),
    JWT_VALIDITY: Joi.string().default('30m').description('the time a jwt token is valid for'),
    FAUCET_AMOUNT: Joi.number()
      .default(10000000) //10 STX
      .description(
        `The amount of uSTX that a registration wallet will be funded with via an API endpoint. 
        For manually funding registration wallets.`,
      ),
    INTERNAL_FAUCET_AMOUNT: Joi.number().default(20000000) // 20 STX
      .description(`The amount of uSTX that a registration wallet will be funded with automatically, 
    via internal internal mechanics.`),
    MINIMUM_BALANCE_THRESHOLD: Joi.number()
      .default(7500000)
      .description(
        `the account balance threshold, in uSTX, upon which a registration wallet is automatically funded by the system.`,
      ), // 7.5 STX
    ENCRYPT_KEY: Joi.string().required().description('encrypt/decrypt key used for to encrypt senstive db coloumns'),
    IS_STRIPE_PAYMENTS_DISABLED: Joi.boolean()
      .default(true) //disabled by default
      .description('Are USD payments disabled?'),
    IS_COINBASE_PAYMENTS_DISABLED: Joi.boolean()
      .default(true) //disabled by default
      .description('Are coinbase/btc payments disabled?'),
    AWS_ACCESS_KEY_ID: Joi.string().description(
      'Access key for using AWS services - will be used used by AWS SDK if added, otherwise will look for machine credentials',
    ),
    AWS_SECRET_ACCESS_KEY: Joi.string().description(
      'Secret key for using AWS services - will be used used by AWS SDK if added, otherwise will look for machine credentials',
    ),
    AWS_REGION: Joi.string().required().description('Region for all AWS services'),
    AWS_LOG_GROUP_NAME: Joi.string().required().description('Cloudwatch log group name'),
    DEV_EMAILS: emailSchema.min(1).unique(),
    CONTRACT_CALL_FEE_CAP: Joi.number().required(),
    CONTRACT_CALL_FEE_MULTIPLIER: Joi.number().required(),
    FIXED_FEE_INCREMENT: Joi.number()
      .required()
      .description('A fixed fee amount in uSTX added to transaction fee estimate'),
    NUMBER_OF_REG_WALLETS_PER_HOT_WALLET: Joi.number()
      .default(25)
      .less(26)
      .description('the number of registration wallets each hot wallet is responsible for fauceting'),
    RETRY_WRAPPER_DELAY: Joi.number().required().description('Delay time used before retrying in retry wrapper'),
    RETRY_COUNT: Joi.number().required().description('Number of retries'),
    SES_EMAIL_FROM: Joi.string().email().required().description('The email address emails will be sent from '),
    SERVER_PRIVATE_KEY: Joi.string()
      .required()
      .description('The private key whose corresponding public key is placed on the dotlocker smart contract'),
    HIRO_API_URL: Joi.string().uri().required().description('Base API URL for hiro/stx API'),
    HIRO_API_KEY: Joi.string().required(),
    TRS_API_USERNAME: Joi.string().required().description('Username for accessing TRS API'),
    TRS_API_PASSWORD: Joi.string().required().description('Password for access TRS API'),
    HIRO_SQS_QUEUE_URL: Joi.string().uri().description('URL for the SQS queue that holds all hiro notifications'), //not required for now
    TRS_SQS_QUEUE_URL: Joi.string()
      .uri()
      .required()
      .description('URL for the SQS queue that holds all TRS notifications'),
    MAILER_SQS_QUEUE_URL: Joi.string().uri().required().description('URL for the mailer queue'),
    DETERMINISTIC_HASH_SECRET: Joi.string()
      .required()
      .description('Secret used for to deterministically hash senstive db coloumns'),
    JWT_VALIDITY_EVENT_MGR: Joi.string()
      .required()
      .description('the time a JWT token generated on an event-mgr will be valid for'),
    LOCKER_API_BASE_URL: Joi.string().uri().required().description('Base API URL for the locker API'),
    USERNAME_EVENT_MGR_POWER_USER: Joi.string()
      .required()
      .description('The user name for the PowerUser that is assigned to event-mgrs'),
    AWS_LAMBDA_ORIGIN_HEADER_VALUE: Joi.string()
      .length(20)
      .required()
      .description(
        'API server requires lambdas to place this value against a X-Lambda-Origin header for all requests made from lambdas to the locker api server',
      ),
    MAGIC_LINK_EXPIRY: Joi.string().required().description('Expiry for the token used in magic links'),
    SENDGRID_API_KEY: Joi.string().required().description('API key for sendgrid'),
    SHOULD_PUSH_TO_QUEUE: Joi.boolean()
      .required()
      .description(
        'Specifies whether events/notifications need to be pushed to SQS queues, if false events/notifications will be logged only',
      ),
    SHOULD_PUSH_TO_EMAIL_QUEUE: Joi.boolean()
      .required()
      .description(
        'Specifies whether email events need to be pushed to SQS queue, if false events will be logged only',
      ),
  })
  .unknown();

const envs = {
  ...process.env,
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS as string).split(' '),
  DEV_EMAILS: (process.env.DEV_EMAILS as string).split(' '),
};

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envs);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  environment: envVars.NODE_ENV,
  port: envVars.PORT,
  allowedOrigins: envVars.ALLOWED_ORIGINS,
  appDomain: envVars.APP_DOMAIN,
  devEmails: envVars.DEV_EMAILS,
  sesEmailFrom: envVars.SES_EMAIL_FROM,
  lockerApiUrl: envVars.LOCKER_API_BASE_URL,
  eventManagerUserName: envVars.USERNAME_EVENT_MGR_POWER_USER,
  jwt: {
    secret: envVars.JWT_SECRET,
    validity: envVars.JWT_VALIDITY,
    eventMgrValidity: envVars.JWT_VALIDITY_EVENT_MGR,
  },
  stacks: {
    network: envVars.NETWORK,
    hiroApiUrl: envVars.HIRO_API_URL,
    hiroApiKey: envVars.HIRO_API_KEY,
  },
  mysql: {
    dbName: envVars.DATABASE_NAME,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    username: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    connectionLimit: envVars.DATABASE_CONNECTION_LIMIT,
    connectionName: envVars.DATABASE_CONNECTION_NAME,
    synchronization: envVars.DATABASE_SYNC_ON,
  },
  stripe: {
    secretKey: envVars.STRIPE_SECRET_KEY,
    endpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
    productImageUrl: envVars.STRIPE_PRODUCT_IMAGE_URL,
    domainCostInUsd: envVars.DOMAIN_COST_USD,
    isStripePaymentDisabled: envVars.IS_STRIPE_PAYMENTS_DISABLED,
  },
  wallets: {
    tempWalletPassword: envVars.TEMP_WALLET_PASSWORD,
    faucetAmount: envVars.FAUCET_AMOUNT,
    internalFaucetAmount: envVars.INTERNAL_FAUCET_AMOUNT,
    minimumBalanceThreshold: envVars.MINIMUM_BALANCE_THRESHOLD,
    regWalletsPerHotWallet: envVars.NUMBER_OF_REG_WALLETS_PER_HOT_WALLET,
  },
  crypt: {
    key: envVars.ENCRYPT_KEY,
    hashSecret: envVars.DETERMINISTIC_HASH_SECRET,
  },
  isCoinbasePaymentDisabled: envVars.IS_COINBASE_PAYMENTS_DISABLED,
  aws: {
    accessKey: envVars.AWS_ACCESS_KEY_ID,
    secretKey: envVars.AWS_SECRET_ACCESS_KEY,
    logGroupName: envVars.AWS_LOG_GROUP_NAME,
    region: envVars.AWS_REGION,
    hiroQueueUrl: envVars.HIRO_SQS_QUEUE_URL,
    trsQueueUrl: envVars.TRS_SQS_QUEUE_URL,
    mailerQueueUrl: envVars.MAILER_SQS_QUEUE_URL,
    lambdaOriginHeaderValue: envVars.AWS_LAMBDA_ORIGIN_HEADER_VALUE,
    shouldPushToQueue: envVars.SHOULD_PUSH_TO_QUEUE,
    shouldPushToEmailQueue: envVars.SHOULD_PUSH_TO_EMAIL_QUEUE,
  },
  fee: {
    feeCap: envVars.CONTRACT_CALL_FEE_CAP,
    feeMultiplier: envVars.CONTRACT_CALL_FEE_MULTIPLIER,
    fixedFeeIncrement: envVars.FIXED_FEE_INCREMENT,
  },
  retry: {
    wrapperDelay: envVars.RETRY_WRAPPER_DELAY,
    count: envVars.RETRY_COUNT,
  },
  smartContract: {
    serverPrivateKey: envVars.SERVER_PRIVATE_KEY,
  },
  trs: {
    username: envVars.TRS_API_USERNAME,
    password: envVars.TRS_API_PASSWORD,
  },
  magicLink: {
    expiry: envVars.MAGIC_LINK_EXPIRY,
  },
  sendgrid: {
    apiKey: envVars.SENDGRID_API_KEY,
  },
};
export default config;
