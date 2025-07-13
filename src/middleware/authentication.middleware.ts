
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';

@Injectable()
export class Authentication implements CanActivate {
constructor(private readonly jwtService:JwtService,private readonly configService: ConfigService,
){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try{
     const request = context.switchToHttp().getRequest();
     const token=request.headers.authorization.split(' ')[1];
     if(!token){
      throw new HttpException({success:false,statusCode:HttpStatus.UNAUTHORIZED,message:"Token missing"},HttpStatus.UNAUTHORIZED)
     }
     request.user= this.jwtService.verify(token,{
      secret: this.configService.get('JWT_SECRET'),
     })
   return true
    }catch(error){
      throw new HttpException({success:false,statusCode:HttpStatus.UNAUTHORIZED,message:error.message},HttpStatus.UNAUTHORIZED)

    }
  }
}
