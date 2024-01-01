import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileBaseModule } from './profile/profileBase.module';
import { PrismaService } from './services/prisma.service';
import { AuthBaseModule } from './auth/authBase.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import env from './config/env';
import { JwtModule } from '@nestjs/jwt';

console.log('node_env', process.env.NODE_ENV);

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    ProfileBaseModule,
    AuthBaseModule,
    JwtModule.register({
      global: true,
      secret: env().JWT_SECRET_KEY,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
