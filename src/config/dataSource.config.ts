import * as dotenv from 'dotenv';
dotenv.config();
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const configService = new ConfigService();
const dataSourceOptions = typeOrmConfig(configService) as DataSourceOptions;
const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => {
    console.log('Data Source initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing Data Source:', error);
  });
export default dataSource;
