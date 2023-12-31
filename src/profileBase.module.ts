import { Module } from '@nestjs/common';
import { ProfileBaseController } from './profileBase.controller';
import { ProfileBaseService } from './profileBase.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ProfileBaseController],
  providers: [ProfileBaseService, PrismaService],
})
export class ProfileBaseModule {}
