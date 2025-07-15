import { Authentication } from '@/middleware/authentication.middleware';
import { Authorization } from '@/middleware/authorization.middleware';
import { Role } from '@/utils/role.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '@service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @Role('Buyer')
  @UseGuards(Authentication, Authorization)
  getping(): { success: boolean; message: string } {
    const response = this.appService.getPing();

    return response;
  }
}
