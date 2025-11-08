import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from 'src/entities/posts.entity';
import { UserModel } from 'src/entities/user.entity';
import { ProfileModel } from 'src/entities/profile.entity';
import { BlogModel } from 'src/entities/blog.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forFeature([UserModel, ProfileModel, BlogModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel, UserModel, ProfileModel, BlogModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
