import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReplyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  parentIdx: number;
  @IsNumber()
  @IsNotEmpty()
  postIdx: number;
  @IsNumber()
  @IsNotEmpty()
  depth: number;
  @IsString()
  @IsNotEmpty()
  writer: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
