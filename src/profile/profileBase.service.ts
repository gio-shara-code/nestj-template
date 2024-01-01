import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ProfileBase, Prisma } from '@prisma/client';

@Injectable()
export class ProfileBaseService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.ProfileBaseWhereUniqueInput) {
    return this.prisma.profileBase.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfileBaseWhereUniqueInput;
    where?: Prisma.ProfileBaseWhereInput;
    orderBy?: Prisma.ProfileBaseOrderByWithRelationInput;
  }): Promise<ProfileBase[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.profileBase.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProfile(
    data: Prisma.ProfileBaseCreateInput,
  ): Promise<ProfileBase> {
    return this.prisma.profileBase.create({
      data,
    });
  }

  async updateProfile(params: {
    where: Prisma.ProfileBaseWhereUniqueInput;
    data: Prisma.ProfileBaseUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.profileBase.update({
      data,
      where,
      select: {
        name: true,
      },
    });
  }

  async deleteProfile(where: Prisma.ProfileBaseWhereUniqueInput) {
    return this.prisma.profileBase.delete({
      where,
      select: {
        id: true,
      },
    });
  }
}
