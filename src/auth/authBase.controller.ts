import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Prisma, AuthBase, $Enums } from '@prisma/client';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileBaseService } from '../profile/profileBase.service';
import { AuthBaseService } from './authBase.service';
import { ProfileTelegramService } from '../profile/profileTelegram.service';

import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

class LoginEmailResponse {
  @ApiProperty()
  token: string;
}

class RegisterEmailResponse
  implements Omit<AuthBase, 'password' | 'authenticationMethod' | 'email'>
{
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

class LoginEmailBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

class RegisterEmailBody implements Prisma.AuthBaseCreateInput {
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

class RegisterTelegramBody {
  @ApiProperty({ required: false })
  telegramUsername: string;

  @ApiProperty()
  telegramId: number;

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  photoUrl: string;
}

class VerifyInvitationCodeBody {
  @ApiProperty()
  code: string;
}

class RegisterTelegramResponse {
  @ApiProperty()
  id: string;
}

class LoginTelegramBody {
  @ApiProperty()
  code: string;
}

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthBaseController {
  constructor(
    private readonly profileService: ProfileBaseService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthBaseService,
    private readonly profileTelegramService: ProfileTelegramService,
  ) {}

  @ApiResponse({
    type: RegisterEmailResponse,
    status: 201,
  })
  @Post('register/email')
  async register(@Body() body?: RegisterEmailBody) {
    const authFound = await this.authService.getUserByEmail(body.email);
    if (authFound) throw new HttpException('Profile Found', HttpStatus.FOUND);

    let hashedPassword;
    if (body.password)
      hashedPassword = this.authService.rsaKey.encrypt(body.password, 'base64');

    return await this.authService.createAuth({
      id: body.id,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      profileBases: {
        create: {
          name: body.name,
        },
      },
      password: hashedPassword,
      authenticationMethod: body.authenticationMethod,
    });
  }

  @ApiResponse({
    type: String,
    status: 201,
  })
  @Post('register/telegram')
  async registerTelegram(@Body() body: RegisterTelegramBody) {
    const foundProfile = await this.profileTelegramService.getProfile({
      id: body.telegramId,
      OR: [
        {
          id: body.telegramId,
        },
        {
          username: body.telegramUsername,
        },
      ],
    });

    if (foundProfile) throw new HttpException('Found', HttpStatus.FOUND);

    const createdAuth = await this.authService.createAuth({
      authenticationMethod: 'TELEGRAM',
      profileBases: {
        create: {
          profileTelegrams: {
            create: {
              id: body.telegramId,
              firstName: body.firstName,
              lastName: body.lastName,
              photoUrl: body.photoUrl,
              username: body.telegramUsername,
            },
          },
        },
      },
    });

    try {
      return this.jwtService.sign({
        id: createdAuth.id,
        username: body.telegramUsername,
        telegramId: body.telegramId,
      });
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    type: LoginEmailResponse,
    status: 201,
  })
  @ApiResponse({
    status: 404,
  })
  @Post('login/email')
  login(@Body() body: LoginEmailBody) {
    return this.authService.signInWithEmailAndPassword(
      body.email,
      body.password,
    );
  }

  @Post('login/telegram')
  loginTelegram(@Body() body: LoginTelegramBody) {
    return this.authService.signInWithInvitationCode(body.code);
  }

  @Post('firebase/email')
  loginEmailFirebase(@Body() loginBody: LoginEmailBody) {
    return '<token>';
  }

  @UseGuards(AuthGuard)
  @Post('verify/invitation-code')
  verifyInvitationCode(@Request() req, @Body() body: VerifyInvitationCodeBody) {
    const user = req['user'];
    console.log(user);
    return 'ok';
  }

  @Post('firebase/anonymous')
  loginAnonymousFirebase() {
    return '<token>';
  }

  @Post('firebase/phone')
  loginFirebasePhone(@Body() data: any) {
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
