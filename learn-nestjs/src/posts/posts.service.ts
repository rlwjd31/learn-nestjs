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

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 100,
    commentCount: 200,
  },
  {
    id: 2,
    author: 'newjeans_haerin',
    title: '하린의 일상',
    content: '오늘도 귀여운 하린이',
    likeCount: 120,
    commentCount: 180,
  },
  {
    id: 3,
    author: 'newjeans_danielle',
    title: '다니엘 셀카',
    content: '다니엘의 셀카 모음',
    likeCount: 150,
    commentCount: 220,
  },
  {
    id: 4,
    author: 'newjeans_hanni',
    title: '하니의 추천 노래',
    content: '요즘 하니가 자주 듣는 음악 추천',
    likeCount: 90,
    commentCount: 160,
  },
];

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

  updatePost(
    id: number,
    author: string | undefined,
    title: string | undefined,
    content: string | undefined,
  ) {
    const findPost = posts.find((post) => post.id === id);

    if (!findPost) throw new NotFoundException(`Post with id ${id} not found`);

    const updatedPost = {
      ...findPost,
      ...(author ? { author } : {}),
      ...(title ? { title } : {}),
      ...(content ? { content } : {}),
    };

    posts = posts.map((post) => (post.id === id ? updatedPost : post));

    return updatedPost;
  }

  deletePost(id: number) {
    if (!posts.find((post) => post.id === id))
      throw new NotFoundException(`Post with id ${id} not found`);

    posts = posts.filter((post) => post.id !== id);

    return id;
  }
}
