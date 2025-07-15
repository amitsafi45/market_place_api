import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { errorMessageExtract } from '@utils/errorMessageExtract';
import { GlobalErrorHandlingFilter } from './utils/globalErrorHandling.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('market-place/api/v1');
  app.use(
    helmet({
      xPoweredBy: false, // Hides the X-Powered-By header or sets it to a custom value
    }),
  );
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      exceptionFactory: errorMessageExtract,
    }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
