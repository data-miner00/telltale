import dotenv from 'dotenv';
import {} from 'crypto';

dotenv.config();

export const PORT = process.env.SERVER_PORT || 3030;
export const ALLOWED_ORIGIN = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://admin.socket.io',
];

export const SOCKET_DASHBOARD_USERNAME =
  process.env.SOCKET_DASHBOARD_USERNAME || 'root';
export const SOCKET_DASHBOARD_PASSWORD =
  process.env.SOCKET_DASHBOARD_PASSWORD || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
