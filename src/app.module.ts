import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditMiddleware } from './audit-log/middlewares/audit.middleware';
import { AuditLogService } from './audit-log/audit-log.service';
import { AuditLog, AuditLogSchema } from './audit-log/schemas/auditLog.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'chaimamanel',
      signOptions: { expiresIn: '3h' },
      publicKey: 'isPublic',
    }),
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://max:chaimamanel@cluster1.j5sl7qh.mongodb.net/project?retryWrites=true&w=majority&appName=cluster1',
    ),
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema },
    ]),
    AuthModule,
    ProfilesModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuditLogService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the AuditMiddleware for every route
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}