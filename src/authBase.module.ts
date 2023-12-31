import { Module } from '@nestjs/common';
import { AuthBaseController } from './authBase.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AuthBaseController],
  providers: [PrismaService],
})
export class AuthBaseModule {}
