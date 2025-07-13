import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { Environment } from '../constants/enum';
export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions & DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
 
  entities: [
    join(__dirname, '..', 'entity', '*.entity.{ts,js}'), // Handles both .ts and .js files in all subdirectories
  ],
  
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE',true),
  logging: configService.get<boolean>(
    'DB_LOGGING',
    configService.get('ENVIRONMENT') === Environment.Development ? true : false,
  ),
  
  extra: {
    max: configService.get<number>('DB_MAX_CONNECTIONS', 10), // Connection pool settings
  },
});
