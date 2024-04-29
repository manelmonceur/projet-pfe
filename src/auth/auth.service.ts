import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    // Create a new user
    await this.usersService.create(createUserDto);
  }
  /*returns a promise that resolves to an object containing a token property of type string.*/
  async signIn(signInDTo: SignInDto): Promise<{ token: string }> {
    const user = await this.usersService.checkCreateUser(signInDTo.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordMatched = await bcrypt.compare(
      signInDTo.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password ');
    }
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return { token };
  }
}
