import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum UserRole {
  ADMIN = 'admin',
  PARENT = 'parent',
  MENTOR = 'mentor',
  TUTOR = 'tutor',
}

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  gender: Gender;
  
  @Prop({ required: true, type: Date })
  dateOfBirth: Date;

  @Prop({ required: true })
  isValid: boolean;

  @Prop({ required: true })
  role: UserRole;

}

export const UserSchema = SchemaFactory.createForClass(User); //This line creates a Mongoose schema
