import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx' })
  idx: number;
  @Column('varchar', { name: 'title', nullable: true, length: 1000 })
  title: string;
  @Column('varchar', { name: 'writer', nullable: true })
  writer: string;
  @Column('varchar', { name: 'pw', nullable: true })
  pw: string;
  @Column('varchar', { name: 'content', nullable: true, length: 4000 })
  content: string;
  @CreateDateColumn()
  regDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
