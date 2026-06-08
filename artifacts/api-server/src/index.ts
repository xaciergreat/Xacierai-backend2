import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';

// API KEYS - HARDCODED FOR PRODUCTION
const API_KEYS = {
  OPENAI_API_KEY: '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',
  GROQ_API_KEY: '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',
};

// Verify keys are loaded
if (!API_KEYS.OPENAI_API_KEY || !API_KEYS.GROQ_API_KEY) {
  console.error('ERROR: API keys are not configured!');
  process.exit(1);
}

console.log('API Keys loaded successfully');

const app = express();

// Middleware
app.use(pinoHttp());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Xacierai Backend API',
    version: '2.0.0',
    endpoints: {
      health: 'GET /api/health',
      info: 'GET /api/info',
      keys: 'GET /api/keys',
      test: 'POST /api/test',
    },
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
});

// Info Endpoint
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    name: 'Xacierai Backend',
    version: '2.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Keys Endpoint - Returns API keys for frontend use
app.get('/api/keys', (req, res) => {
  try {
    res.json({
      success: true,
      keys: {
        openai: API_KEYS.OPENAI_API_KEY,
        groq: API_KEYS.GROQ_API_KEY,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve API keys',
    });
  }
});

// Test Endpoint - POST
app.post('/api/test', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }
    
    res.json({
      success: true,
      received: message,
      echo: 'Echo: ' + message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Test endpoint error',
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Server Startup
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log('Server running at http://' + HOST + ':' + PORT);
  console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
