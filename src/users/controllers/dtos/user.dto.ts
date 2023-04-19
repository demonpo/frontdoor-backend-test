import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
