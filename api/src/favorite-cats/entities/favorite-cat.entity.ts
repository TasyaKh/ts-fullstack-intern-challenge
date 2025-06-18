import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('favorite_cats')
export class FavoriteCat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cat_id' })
  catId: string;

  //   TODO: RETHINK. there was no user auth/register in task and design, skip
  //   @ManyToOne(() => User, user => user.favoriteCats)
  //   user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
