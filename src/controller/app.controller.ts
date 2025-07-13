import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from '@service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {success:boolean,message:string} {
    const response= this.appService.getHello();
    
    return response
  }
}
