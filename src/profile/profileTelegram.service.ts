import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class ProfileTelegramService {
  constructor(private readonly prismaService: PrismaService) {}

  createProfile(input: Prisma.ProfileTelegramCreateInput) {
    return this.prismaService.profileTelegram.create({
      data: input,
      select: {
        id: true,
      },
    });
  }

  getProfile(where: Prisma.ProfileTelegramWhereUniqueInput) {
    return this.prismaService.profileTelegram.findUnique({
      where,
    });
  }
}
