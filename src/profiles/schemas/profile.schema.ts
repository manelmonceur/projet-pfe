import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../users/schemas/user.schema';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema()
export class Profile {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  gender: Gender;

  @Prop()
  specialNeeds: string;

  @Prop()
  picture: string;

  @Prop({ type: 'ObjectId', ref: 'User' }) // Reference to User document
  parent: User;

  @Prop({ required: true, type: Date })
  dateOfBirth: Date;

  @Prop({ required: true })
  location: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile); //This line creates a Mongoose schema
