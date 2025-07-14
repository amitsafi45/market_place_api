import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { errorMessageExtract } from '@utils/errorMessageExtract';
import { GlobalErrorHandlingFilter } from './utils/globalErrorHandling.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('market-place/api/v1');
  app.useGlobalPipes(new ValidationPipe(
    {
      stopAtFirstError: true,
      transform: true,
      whitelist:true,
      exceptionFactory: errorMessageExtract,
      }
  ));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
