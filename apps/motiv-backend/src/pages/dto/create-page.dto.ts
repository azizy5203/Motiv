import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  pageCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}
