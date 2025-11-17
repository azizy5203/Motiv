import { IsString, IsOptional } from 'class-validator';

export class UpdateUserGroupDto {
  @IsString()
  @IsOptional()
  name?: string;
}
