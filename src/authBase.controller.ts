import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Prisma, AuthBase, $Enums } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as process from 'process';
import * as NodeRSA from 'node-rsa';
const rsaKey = new NodeRSA(process.env.RSA_PRIVATE_KEY);

class AuthBaseCreateResponse
  implements Omit<AuthBase, 'password' | 'authenticationMethod'>
{
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

class AuthLoginBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

class RegisterAuthBody implements Prisma.AuthBaseCreateInput {
  @ApiProperty({
    required: false,
  })
  id?: string;

  @ApiProperty({
    required: false,
  })
  createdAt?: Date | string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    enum: $Enums.AuthenticationMethod,
  })
  authenticationMethod: $Enums.AuthenticationMethod;

  @ApiProperty({
    required: false,
  })
  updatedAt?: Date | string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  name: string;
}

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthBaseController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiResponse({
    type: AuthBaseCreateResponse,
    status: 201,
  })
  @Post('email')
  async register(@Body() data?: RegisterAuthBody) {
    const foundProfile = await this.prismaService.profileBase.findUniqueOrThrow(
      {
        where: {
          email: data.email,
        },
      },
    );
    // if (!foundProfile)
    //   throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    let hashedPassword;
    if (data.password) hashedPassword = rsaKey.encrypt(data.password, 'base64');

    return this.prismaService.authBase.create({
      data: {
        id: data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        ProfileBase: {
          create: {
            email: data.email,
            name: data.name,
          },
        },
        password: hashedPassword,
        authenticationMethod: data.authenticationMethod,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Post('firebase/email')
  registerEmailFirebase(@Body() loginBody: AuthLoginBody) {
    return '<token>';
  }

  @Post('firebase/anonymous')
  registerAnonymousFirebase() {
    return '<token>';
  }

  @Post('firebase/phone')
  login(@Body() data: any) {
    return '<token>';
  }

  @Post('web3auth/connect')
  web3AuthConnect() {
    return '<wallet_address>';
  }

  @Post('web3auth/approve')
  web3AuthApprove() {
    return 'ok';
  }
}
