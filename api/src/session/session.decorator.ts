import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserSession = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    return user;
  },
);
