import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Keyword } from '../entity/keyword';

@Injectable()
@EntityRepository(Keyword)
export class KeywordRepository extends Repository<Keyword> {}
