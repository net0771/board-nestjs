import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'notice' })
export class Notice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idx' })
  idx: number;
  @Column('varchar', { name: 'writer', nullable: true })
  writer: string;
  @Column('varchar', { name: 'content', nullable: true, length: 1000 })
  content: string;
  @CreateDateColumn()
  regDate: Date;
}
