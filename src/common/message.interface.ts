import { Request } from 'express';

export interface ApiResponseMessage {
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  data?: any; // Optional, you can type this more strictly if needed
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}
