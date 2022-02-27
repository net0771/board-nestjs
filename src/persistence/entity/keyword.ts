import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'keyword' })
export class Keyword {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx' })
  idx: number;
  @Column('int', { name: 'userIdx', nullable: true })
  userIdx: number;
  @Column('varchar', { name: 'keyword', nullable: true })
  keyword: string;
  @CreateDateColumn()
  regDate: Date;
}
