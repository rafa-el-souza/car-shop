export interface DomainError<E> {
  code?: number;
  message?: string;
  error?: E;
}

export default DomainError;