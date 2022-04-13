import { ZodError } from 'zod';

export interface DomainError {
  error?: ZodError;
  message?: string;
  code?: number; 
}

export default DomainError;