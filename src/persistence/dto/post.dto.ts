import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  postIdx: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  writer: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  pw: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
