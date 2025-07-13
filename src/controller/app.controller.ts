import { Authentication } from '@/middleware/authentication.middleware';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '@service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @UseGuards(Authentication)
  getping(): {success:boolean,message:string} {
    const response= this.appService.getPing();
    
    return response
  }
}
