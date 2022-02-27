import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Post } from '../entity/post';

@Injectable()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public async getBoard(
    page: number,
    type: string,
    searchWord: string,
  ): Promise<[Post[], number]> {
    const size = 10;
    const offset = page <= 0 || page === null ? 0 : (page - 1) * size;

    const listQuery = getRepository(Post)
      .createQueryBuilder('post')
      .select([
        'post.idx',
        'post.writer',
        'post.content',
        'post.regDate',
        'post.updateDate',
      ])
      .skip(offset)
      .take(size)
      .orderBy('post.regDate', 'DESC');

    if (type === 'title') {
      listQuery.andWhere('post.title like :searchWord', {
        searchWord: `%${searchWord}%`,
      });
    }

    if (type === 'writer') {
      listQuery.andWhere('post.writer like :searchWord', {
        searchWord: `%${searchWord}%`,
      });
    }

    return listQuery.getManyAndCount();
  }
}
