import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.checkCreateUser(createUserDto.email);

    if (exist) {
      throw new ConflictException('User Exist');
    }
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user.'); //this cz none valid mongodb ids make an error
    }
    if (!user) {
      throw new NotFoundException('Could not find user.'); //this is for valid mongodb errors that doesn't exist
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true }) // { new: true } option ensures that the method returns the modified document rather than the original one
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.'); //this cz none valid mongodb ids make an error
    }
    if (!updatedUser) {
      throw new NotFoundException('Could not find user.'); //this is for valid mongodb errors that doesn't exist
    }
    return updatedUser;
  }

  async remove(id: string) {
    let result;
    try {
      result = await this.userModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }
  async checkCreateUser(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async isUserParent(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return user && user.role === 'parent';
  }
}
