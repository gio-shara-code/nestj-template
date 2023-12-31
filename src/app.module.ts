import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileBaseModule } from './profileBase.module';
import { PrismaService } from './prisma.service';
import { AuthBaseModule } from './authBase.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

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
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : 'env.dev',
    }),
    ProfileBaseModule,
    AuthBaseModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
