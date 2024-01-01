import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AuthInvitationCodeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirstInvitationCode(code: string) {
    return this.prismaService.authInvitationCode.findFirst({
      where: {
        code,
      },
    });
  }
}
