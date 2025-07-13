import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  Matches,
  Length,
} from 'class-validator';
import { Environment } from '@/constant/enum';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @Min(1) // Port numbers range from 1 to 65535
  @Max(65535)
  PORT: number;

  @IsNotEmpty()
  @IsString()
  @Length(32, 256) // Assuming secret keys have a minimum length of 32 characters
  JWT_SECRET:string

  @IsNotEmpty()
  @IsEnum(Environment)
  ENVIRONMENT: Environment;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256) // Assuming hostname has a maximum length of 256 characters
  DB_HOST: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256) // Assuming username has a maximum length of 256 characters
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256) // Assuming password has a maximum length of 256 characters
  DB_PASSWORD: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 256) // Assuming database name has a maximum length of 256 characters
  DB_DATABASE: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  THROTTLE_TTL: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  THROTTLE_LIMIT: number;
}
