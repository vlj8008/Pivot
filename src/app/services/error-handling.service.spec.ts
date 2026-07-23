import { ErrorHandlingService } from './error-handling.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    service = new ErrorHandlingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log errors in standard JSON format', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Test error');
    const mockContext = { userId: 123 };

    service.logError('TestSource', mockError, mockContext);

    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output as string);

    expect(parsed.timestamp).toBeDefined();
    expect(parsed.source).toBe('TestSource');
    expect(parsed.error).toBeDefined();
    expect(parsed.context).toEqual(mockContext);
  });
});
