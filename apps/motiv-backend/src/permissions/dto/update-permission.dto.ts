import { IsString, IsOptional } from 'class-validator';

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  module?: string;

  @IsString()
  @IsOptional()
  action?: string;
}
