import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { UserModel } from 'src/entities/user.entity';
import { ProfileModel } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogModel } from 'src/entities/blog.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get('users/profile')
  async getUsers() {
    const users = await this.userRepository.find({
      relations: {
        profile: true,
      },
    });

    return users;
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const newUser = await this.userRepository.save({
      email: 'rlwjd31@naver.com',
    });

    const newProfile = await this.profileRepository.save({
      profileImage: 'rlwjd31 profile image',
      user: newUser,
    });

    return newUser;
  }
}
