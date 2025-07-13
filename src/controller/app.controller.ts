import { Controller, Get, HttpCode } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '@service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getping(): {success:boolean,message:string} {
    const response= this.appService.getPing();
    
    return response
  }
}
