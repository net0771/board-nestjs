import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../../persistence/repository/post.repository';
import { ReplyRepository } from '../../persistence/repository/reply.repository';
import { NoticeRepository } from '../../persistence/repository/notice.repository';
import { KeywordRepository } from '../../persistence/repository/keyword.repository';
import { ResponseDto } from '../../persistence/dto/response.dto';
import { PostDto } from '../../persistence/dto/post.dto';
import { ReplyDto } from '../../persistence/dto/reply.dto';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(ReplyRepository)
    private replyRepository: ReplyRepository,
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
    private connection: Connection,
  ) {}

  sendNotice(userIdx: number, content: string) {
    // 알림 보내는 함수
    return null;
  }

  async getBoard(page: number, type: string, searchWord: string) {
    const board = await this.postRepository.getBoard(page, type, searchWord);
    return new ResponseDto(200, board, 'success');
  }

  async addPost(data: PostDto) {
    const hashedPw = await bcrypt.hash(data.pw, 10);
    // 1. 게시글 작성 시 키워드를 받을 수 있다면
    // 게시글 키워드 배열을 별도의 테이블 저장하고,
    // 해당 키워드를 등록해놓은 사용자들에게만 알림 보내기 (등록할 때 마다)

    // 2. 게시글이나 댓글 내용에서 키워드가 포함되어있는지 찾아야 한다면
    // 등록된 모든 키워드들을 불러와서 내용과 비교해야됨
    // 등록할 때 마다 비교하는게 아닌 주기적으로 하는게 나을듯

    // 여기서는 2번 방법으로 간단하게 알림 기능 형태만 구현했습니다.
    const keywordList = await this.keywordRepository.find();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const postRepository =
      queryRunner.manager.getCustomRepository(PostRepository);
    const noticeRepository =
      queryRunner.manager.getCustomRepository(NoticeRepository);

    try {
      await postRepository.save({
        writer: data.writer,
        title: data.title,
        content: data.content,
        pw: hashedPw,
      });
      for (const item of keywordList) {
        if (data.content.includes(item.keyword)) {
          const message =
            '[ ' + item.keyword + ' ]' + ' 가 포함된 게시글이 등록되었습니다.';
          await noticeRepository.save({
            writer: data.writer,
            content: message,
          });
          this.sendNotice(item.userIdx, message);
        }
      }
      await queryRunner.commitTransaction();
      return new ResponseDto(200, null, 'success');
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw new Error();
    } finally {
      await queryRunner.release();
    }
  }

  async editPost(data: PostDto) {
    if (data.postIdx === undefined) throw new BadRequestException();
    const post = await this.postRepository.findOne(data.postIdx);
    if (!post) throw new NotFoundException();
    if (!(await bcrypt.compare(data.pw, post.pw)))
      throw new UnauthorizedException();
    post.title = data.title;
    post.content = data.content;
    await this.postRepository.save(post);
    return new ResponseDto(200, null, 'success');
  }

  async deletePost(postIdx: number, pw: string) {
    const post = await this.postRepository.findOne(postIdx);
    if (!post) throw new NotFoundException();
    if (!(await bcrypt.compare(pw, post.pw))) throw new UnauthorizedException();
    await this.postRepository.delete({ idx: postIdx });
    return new ResponseDto(200, null, 'success');
  }

  async getReply(page: number, postIdx: number) {
    const reply = await this.replyRepository.getReply(page, postIdx);

    reply[0].sort((a, b) => {
      if (a.depth === 1 && b.depth === 1) {
        if (a.parentIdx === b.parentIdx) {
          const dateA = new Date(a.regDate).getDate();
          const dateB = new Date(b.regDate).getDate();
          return dateA > dateB ? 1 : -1;
        }
      }
    });

    return new ResponseDto(200, reply, 'success');
  }

  async addReply(data: ReplyDto) {
    const post = await this.postRepository.findOne(data.postIdx);
    if (!post) throw new NotFoundException();
    const keywordList = await this.keywordRepository.find();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const replyRepository =
      queryRunner.manager.getCustomRepository(ReplyRepository);
    const noticeRepository =
      queryRunner.manager.getCustomRepository(NoticeRepository);

    try {
      const reply = await replyRepository.save({
        writer: data.writer,
        content: data.content,
        postIdx: data.postIdx,
        depth: data.depth,
      });
      reply.parentIdx =
        data.parentIdx !== undefined ? data.parentIdx : reply.idx;
      await replyRepository.save(reply);
      for (const item of keywordList) {
        if (data.content.includes(item.keyword)) {
          const message =
            '[ ' + item.keyword + ' ]' + ' 가 포함된 댓글이 등록되었습니다.';
          await noticeRepository.save({
            writer: data.writer,
            content: message,
          });
          this.sendNotice(item.userIdx, message);
        }
      }
      await queryRunner.commitTransaction();
      return new ResponseDto(200, null, 'success');
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw new Error();
    } finally {
      await queryRunner.release();
    }
  }
}
