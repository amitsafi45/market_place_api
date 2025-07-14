import { LoginDTO, UserRegisterDTO } from "@/dto/user.dto";
import { UserService } from "@/service/user.service";
import * as bcrypt from 'bcrypt';
import { Controller, Get, Post, Param, Body, HttpStatus, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

  ) { }
  @Post('/register')
  async register(@Body() data: UserRegisterDTO) {
    const checkIsUserExist = await this.userService.getUserByEmail(data.email)
    if (checkIsUserExist) {
      throw new BadRequestException("Account with this email already exists.");

    }
    data.password = await bcrypt.hash(data.password, 10);
    await this.userService.createUser(data)
    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Account created Successfully",
    }
  }

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    const checkIsUserExist = await this.userService.getUserByEmail(data.email);


    if (!checkIsUserExist) {
      throw new BadRequestException('Invalid Email Or Password')

    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      checkIsUserExist.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Email Or Password')

    }

    // Generate JWT Token
    const payload = {
      sub: checkIsUserExist.id,
      role: checkIsUserExist.role,
      email: checkIsUserExist.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    },);

    return {
      success: true,
      statusCode: HttpStatus.ACCEPTED,
      message: 'Login Successfully',
      data: {
        accessToken,
        user: {
          id: checkIsUserExist.id,
          name: checkIsUserExist.name,
          email: checkIsUserExist.email,
          role: checkIsUserExist.role,
        },
      },
    };
  }

}
