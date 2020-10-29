import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from './User';
import Movie from './Movie';

@Entity('rents')
class Rent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  status: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @Column()
  movie_id: string;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rent;