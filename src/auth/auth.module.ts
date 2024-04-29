import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    /*PassportModule.register({ defaultStrategy: 'jwt' }) registers the PassportModule with the default strategy set to 'jwt', indicating that JWT tokens will be used for authentication by default. */
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /*JwtModule.registerAsync() asynchronously configures the JwtModule. The useFactory property is used to define a factory function that returns an options object for configuring JWT. */
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: 'chaimamanel',
          signOptions: {
            expiresIn: '3d', // Set the expiration time for JWT tokens to 3 days
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
