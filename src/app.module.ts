import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '@controller/app.controller';
import { AppService } from '@service/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@config/typeorm.config';
import { envValidate } from '@utils/envValidator';
import { LoggingMiddleware } from '@middleware/logging.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './module/user.module';
import { ProductModule } from './module/product.module';
import { OrderModule } from './module/order.module';

@Module({
  imports: [ 
    
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validate: envValidate,
    }),
  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
      }),
     ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: parseInt(config.get('THROTTLE_TTL', '3600')),
         limit: parseInt(config.get('THROTTLE_LIMIT', '100')),
        },
      ],
    }),
     UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
  provide: APP_GUARD,
  useClass: ThrottlerGuard
},],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply middleware globally or to specific routes
  }
}
