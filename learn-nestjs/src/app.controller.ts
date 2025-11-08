import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { UserModel } from 'src/entities/user.entity';
import { ProfileModel } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogModel } from 'src/entities/blog.entity';
import { TagModel } from 'src/entities/tag.entity';

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
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
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

  @Post('blogs/tags')
  async createBlogsTags() {
    const blog1 = await this.blogRepository.save({
      title: 'blog tag test1',
      content: 'blog tag test1',
    });

    const blog2 = await this.blogRepository.save({
      title: 'blog tag test2',
      content: 'blog tag test2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      blogs: [blog1, blog2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      blogs: [blog1],
    });

    const blog3 = await this.blogRepository.save({
      title: 'Next JS Lecture',
      content: 'blog tag test3',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('blogs')
  getBlogs() {
    return this.blogRepository.find({ relations: { tags: true } });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find();
  }
}
