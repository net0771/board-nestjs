import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Notice } from '../entity/notice';

@Injectable()
@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {}
