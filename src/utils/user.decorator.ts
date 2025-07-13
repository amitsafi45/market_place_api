import { JwtPayload } from '@/interface/global.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user,"request.user")
    console.log(data,"data")

    return data ? request.user?.[data] : request.user;
  },
);