// Configuration file with environment-based secrets
const config = {
  development: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 27017,
      name: process.env.DB_NAME || 'appsec_dev',
      username: process.env.DB_USER || 'dev_user',
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d'
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  },
  
  production: {
    database: {
      host: process.env.DB_HOST || 'prod-db-cluster.amazonaws.com',
      port: parseInt(process.env.DB_PORT) || 27017,
      name: process.env.DB_NAME || 'appsec_prod',
      username: process.env.DB_USER || 'prod_admin',
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '2h'
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-west-2'
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    },
    external_apis: {
      github_token: process.env.GITHUB_TOKEN,
      slack_webhook: process.env.SLACK_WEBHOOK_URL,
      sendgrid_api_key: process.env.SENDGRID_API_KEY,
      openai_api_key: process.env.OPENAI_API_KEY
    }
  },
  
  test: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 27017,
      name: process.env.DB_NAME || 'appsec_test',
      username: process.env.DB_USER || 'test_user',
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    }
  }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];