import { UserModel } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  profileImage: string;

  @OneToOne(() => UserModel, (user) => user.profile, { cascade: true })
  @JoinColumn()
  user: UserModel;
}
