import { IJwtPayload } from '@/interface/global.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof IJwtPayload, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();  
  return data ? request.user?.[data] : request.user;
  },
);