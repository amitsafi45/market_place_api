import { UserRegisterDTO } from '@/dto/user.dto';
import { UserEntity } from '@/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(data: UserRegisterDTO) {
    return await this.userRepository.insert(data);
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }
}
