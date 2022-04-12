import { ZodError } from 'zod';

export interface DomainError {
  error: ZodError;
}

export default DomainError;