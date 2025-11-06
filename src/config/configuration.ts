export default () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  jwtSecret: process.env.JWT_SECRET || 'my-secret',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '3306',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASS || '',
  dbName: process.env.DB_NAME || 'testdb',
});
