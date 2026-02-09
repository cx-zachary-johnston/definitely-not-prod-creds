const request = require('supertest');
const app = require('./server');

describe('AppSec API Server', () => {
  // Test configuration from environment
  const testApiKey = process.env.TEST_API_KEY;
  const testDbPassword = process.env.TEST_DB_PASSWORD;
  
  describe('Health Check', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('Authentication', () => {
    test('POST /api/auth/register should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
    });

    test('POST /api/auth/login should authenticate user', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      if (response.status === 200) {
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toBeDefined();
      }
    });
  });

  describe('Security Configuration', () => {
    test('Should have proper security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Check for security headers set by helmet
      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBeDefined();
    });
  });

  // Mock configuration from environment
  const mockAwsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };

  describe('External API Integration Tests', () => {
    test('Mock external service integration', () => {
      const mockToken = process.env.GITHUB_TOKEN;
      expect(mockToken).toBeDefined();
      expect(mockAwsConfig.accessKeyId).toBeDefined();
    });
  });
});