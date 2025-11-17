import { IsString, IsOptional } from 'class-validator';

export class UpdatePageDto {
  @IsString()
  @IsOptional()
  pageCode?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  route?: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}
