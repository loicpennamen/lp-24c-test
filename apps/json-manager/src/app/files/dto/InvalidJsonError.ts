export class InvalidJsonError extends Error {
  data: string;

  constructor(message: string, data: string) {
    super(message);
    this.name = 'AppNotFoundError';
    this.data = data;
  }
}
