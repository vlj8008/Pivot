import { Service } from '@angular/core';

@Service()
export class ErrorHandlingService {
  logError(source: string, error: unknown, context?: any): void {
    const errorLog = {
      timestamp: new Date().toISOString(),
      source,
      error: error instanceof Error ? error.message : error,
      context
    };
    console.error(JSON.stringify(errorLog));
  }
}
