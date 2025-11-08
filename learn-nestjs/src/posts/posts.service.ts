import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';

export type PostModel = {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
};

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) throw new NotFoundException(`Post with id ${id} not found`);

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    id: number,
    author: string | undefined,
    title: string | undefined,
    content: string | undefined,
  ) {
    const findPost = await this.postsRepository.findOne({ where: { id } });

    if (!findPost) throw new NotFoundException(`Post with id ${id} not found`);

    const updatedPost = {
      ...findPost,
      ...(author ? { author } : {}),
      ...(title ? { title } : {}),
      ...(content ? { content } : {}),
    };

    console.log(updatedPost);

    const responsePost = await this.postsRepository.save(updatedPost);

    return responsePost;
  }

  async deletePost(id: number) {
    const findPost = await this.postsRepository.findOne({ where: { id } });

    if (!findPost) throw new NotFoundException(`Post with id ${id} not found`);

    await this.postsRepository.delete(id);

    return id;
  }
}
