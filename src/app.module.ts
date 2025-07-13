import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { envValidate } from './utils/envValidator';

@Module({
  imports: [ ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validate: envValidate,
    }),TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
