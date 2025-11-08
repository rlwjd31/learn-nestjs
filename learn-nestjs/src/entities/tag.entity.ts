import { BlogModel } from 'src/entities/blog.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TagModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => BlogModel, (blog) => blog.tags)
  @JoinTable()
  blogs: BlogModel[];

  @Column()
  name: string;
}
