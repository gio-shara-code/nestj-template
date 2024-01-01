import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as NodeRSA from 'node-rsa';
import env from '../config/env';
import { AuthInvitationCodeService } from './authInvitationCode.service';

@Injectable()
export class AuthBaseService {
  readonly rsaKey = new NodeRSA(env().RSA_PRIVATE_KEY);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authInvitationCodeService: AuthInvitationCodeService,
  ) {}

  async getUserById(id: string) {
    return this.prismaService.authBase.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.authBase.findUnique({
      where: {
        email,
      },
    });
  }

  async createAuth(input: Prisma.AuthBaseCreateInput) {
    return this.prismaService.authBase.create({
      data: input,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const foundUser = await this.getUserByEmail(email);
    if (!foundUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const decryptedPassword = this.rsaKey.decrypt(foundUser.password, 'utf8');

    if (decryptedPassword !== password) throw new UnauthorizedException();
    const payload = { sub: foundUser.id, email: email };
    try {
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async signInWithInvitationCode(code: string) {
    // TODO check if invitation code is valid
    const codeFound =
      await this.authInvitationCodeService.findFirstInvitationCode(code);
    // TODO check if the user has telegram account created
    // TODO
  }
}
