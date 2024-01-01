import { Module } from '@nestjs/common';
import { AuthBaseController } from './authBase.controller';
import { PrismaService } from '../services/prisma.service';
import { ProfileBaseService } from '../profile/profileBase.service';
import { AuthBaseService } from './authBase.service';
import { ProfileTelegramService } from '../profile/profileTelegram.service';
import { AuthInvitationCodeService } from './authInvitationCode.service';

@Module({
  imports: [],
  controllers: [AuthBaseController],
  providers: [
    PrismaService,
    ProfileBaseService,
    AuthBaseService,
    ProfileTelegramService,
    AuthInvitationCodeService,
  ],
})
export class AuthBaseModule {}
