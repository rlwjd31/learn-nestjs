// id, email, profile, role

import { BlogModel } from 'src/entities/blog.entity';
import { ProfileModel } from 'src/entities/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column({
    default: ROLE.USER,
  })
  role: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    cascade: true,
  })
  profile: ProfileModel;

  @OneToMany(() => BlogModel, (blog) => blog.author)
  blogs: BlogModel[];
}
