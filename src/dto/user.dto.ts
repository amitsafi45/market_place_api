import { UserRole } from '@/constant/enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty({ message: 'Name is required'})
  @IsString()
  @Length(2, 150, { message: 'Name must be between 2 and 150 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Password is too weak' },
  )

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional() // Optional because we'll default it
  @IsEnum(UserRole, { message: 'Role must be Buyer or Seller' })
  role?: UserRole = UserRole.Buyer;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
