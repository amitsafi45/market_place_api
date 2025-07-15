import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entity/user.entity';
import { UserService } from '@service/user.service';
import { UserController } from '@controller/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService], // Exported if used in other modules (e.g., Auth)
})
export class UserModule {}
