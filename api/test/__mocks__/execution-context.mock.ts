import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export function createMockedExecutionContext(request: Request): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: (): Request => request }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as ExecutionContext;
}
