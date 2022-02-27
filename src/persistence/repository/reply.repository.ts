import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Reply } from '../entity/reply';

@Injectable()
@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  public async getReply(
    page: number,
    postIdx: number,
  ): Promise<[Reply[], number]> {
    const size = 10;
    const offset = page <= 0 || page === null ? 0 : (page - 1) * size;

    const listQuery = getRepository(Reply)
      .createQueryBuilder('reply')
      .select([
        'reply.idx',
        'reply.depth',
        'reply.parentIdx',
        'reply.writer',
        'reply.content',
        'reply.regDate',
        'reply.updateDate',
      ])
      .skip(offset)
      .take(size)
      .orderBy('reply.parentIdx', 'ASC')
      .where('reply.postIdx = :idx', { idx: postIdx });

    return listQuery.getManyAndCount();
  }
}
