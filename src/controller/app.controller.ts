import { Authentication } from '@/middleware/authentication.middleware';
import { Authorization } from '@/middleware/authorization.middleware';
import { Role } from '@/utils/role.decorator';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '@service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @Role('Buyer')
  @UseGuards(Authentication,Authorization)
  getping(): {success:boolean,message:string} {
    const response= this.appService.getPing();
    
    return response
  }
}
