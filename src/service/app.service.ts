import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPing(): { success: boolean; message: string } {
    return {
      success: true,
      message: 'Welcome to market place api',
    };
  }
}
