import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class InvitedSignUpDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
