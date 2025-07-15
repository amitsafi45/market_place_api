import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtPayload } from '@/interface/global.interface';

@Injectable()
export class Authentication implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authHeader = request.headers?.authorization;

      if (
        !authHeader ||
        typeof authHeader !== 'string' ||
        !authHeader.startsWith('Bearer ')
      ) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Invalid or missing Authorization header',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = authHeader.split(' ')[1];

      const decoded = this.jwtService.verify<IJwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = decoded;

      return true;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.UNAUTHORIZED,
          message:
            error?.name === 'JsonWebTokenError'
              ? 'Invalid token'
              : error?.message || 'Authentication failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
