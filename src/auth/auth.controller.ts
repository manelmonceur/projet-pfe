import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(process.env.JWT_SECRET);
    console.log(process.env.IS_PUBLIC_KEY);
    try {
      await this.authService.signUp(createUserDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/signIn')
  signIn(@Body() signInDTo: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDTo);
  }
}
