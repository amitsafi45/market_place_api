
import { ROLE_KEY } from '@/utils/role.decorator';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';

@Injectable()
export class Authorization implements CanActivate {

 constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try{
     
       const request = context.switchToHttp().getRequest();
       const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [context.getHandler(), context.getClass()]);
       if(request.user.role!==requiredRole){
         throw new HttpException({success:false,statusCode:HttpStatus.FORBIDDEN,message:"Forbidden resource"},HttpStatus.UNAUTHORIZED)

       }
   return true
    }catch(error){
      throw new HttpException({success:false,statusCode:HttpStatus.UNAUTHORIZED,message:"Forbidden resource"},HttpStatus.UNAUTHORIZED)

    }
  }
}
