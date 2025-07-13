import { createParamDecorator, ExecutionContext } from '@nestjs/common';
interface JwtPayload {
  sub: string;
  email: string;
  role: 'Buyer' | 'Seller';
}
export const User = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user,"request.user")
    console.log(data,"data")

    return data ? request.user?.[data] : request.user;
  },
);