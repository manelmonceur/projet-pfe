import { IsDate, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  specialNeeds?: string;

  picture?: Express.Multer.File;

  @IsNotEmpty()
  parent: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  location: string;
}
