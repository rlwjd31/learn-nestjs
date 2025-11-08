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
    @InjectRepository(BlogModel)
    private readonly blogRepository: Repository<BlogModel>,
  ) {}

  @Get('users/profile')
  async getUsers() {
    const users = await this.userRepository.find({
      relations: {
        profile: true,
        blogs: true,
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

  @Get('users/blog')
  async getBlog() {
    return this.blogRepository.find({
      relations: {
        author: true,
      },
    });
  }

  @Post('users/blog')
  async createUserBlogs() {
    const user = await this.userRepository.save({
      email: 'blog user2',
    });

    const newBlog = this.blogRepository.save({
      author: user,
      title: 'blog title2',
      content: 'blog content2',
    });

    return newBlog;
  }
}
