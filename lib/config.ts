// Configuration for API endpoints
const isDevelopment = process.env.NODE_ENV === 'development';

// Backend server URL - change this to your deployed backend URL in production
export const BACKEND_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  MCP: `${BACKEND_URL}/api/mcp`,
  TTS: `${BACKEND_URL}/api/tts`,
  HEALTH: `${BACKEND_URL}/health`,
} as const;

// CORS configuration
export const CORS_CONFIG = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
} as const; 