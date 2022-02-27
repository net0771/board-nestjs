import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { PostDto } from '../../persistence/dto/post.dto';
import { ReplyDto } from '../../persistence/dto/reply.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 게시글 목록
  @Get('')
  async getBoard(
    @Query('page', ParseIntPipe) page: number,
    @Query('type') type: string,
    @Query('searchWord') searchWord: string,
  ) {
    return await this.boardService.getBoard(page, type, searchWord);
  }

  // 게시글 작성
  @Post('')
  async addPost(@Body(new ValidationPipe()) data: PostDto) {
    return await this.boardService.addPost(data);
  }

  // 게시글 수정
  @Post('edit')
  async editPost(@Body(new ValidationPipe()) data: PostDto) {
    return await this.boardService.editPost(data);
  }

  // 게시글 삭제
  @Delete('')
  async deletePost(
    @Query('post', ParseIntPipe) postIdx: number,
    @Query('pw') pw: string,
  ) {
    return await this.boardService.deletePost(postIdx, pw);
  }

  // 댓글 목록
  @Get('reply')
  async getReply(
    @Query('page', ParseIntPipe) page: number,
    @Query('post', ParseIntPipe) postIdx: number,
  ) {
    return await this.boardService.getReply(page, postIdx);
  }

  // 댓글 작성
  @Post('reply')
  async addReply(@Body(new ValidationPipe()) data: ReplyDto) {
    return await this.boardService.addReply(data);
  }
}
