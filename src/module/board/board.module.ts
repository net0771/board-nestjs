import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { PostRepository } from '../../persistence/repository/post.repository';
import { ReplyRepository } from '../../persistence/repository/reply.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeRepository } from '../../persistence/repository/notice.repository';
import { KeywordRepository } from '../../persistence/repository/keyword.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      ReplyRepository,
      NoticeRepository,
      KeywordRepository,
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
