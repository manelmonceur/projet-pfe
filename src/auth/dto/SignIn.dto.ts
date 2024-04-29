import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export enum UserRole {
  ADMIN = 'admin',
  PARENT = 'parent',
  MENTOR = 'mentor',
  TUTOR = 'tutor',
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class SignInDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

}
