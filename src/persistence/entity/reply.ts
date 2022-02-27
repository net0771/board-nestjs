import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'reply' })
export class Reply {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx' })
  idx: number;
  @Column('int', { name: 'postIdx', nullable: true })
  postIdx: number;
  @Column('int', { name: 'depth', nullable: true, default: 0 })
  depth: number;
  @Column('int', { name: 'parentIdx', nullable: true })
  parentIdx: number;
  @Column('varchar', { name: 'writer', nullable: true })
  writer: string;
  @Column('varchar', { name: 'content', nullable: true, length: 2000 })
  content: string;
  @CreateDateColumn()
  regDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
}
