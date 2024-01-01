import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileBaseService } from './profileBase.service';
import { Prisma, ProfileBase } from '@prisma/client';
import * as cleaner from 'obj-clean';

class ProfileFindOneResponse implements ProfileBase {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}

class ProfileFindOneQuery {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  id: string;
}

class CreatePrismaRelation {
  @ApiProperty({
    required: false,
  })
  create?: any;
  @ApiProperty({
    required: false,
  })
  connectOrCreate?: any;
  @ApiProperty({
    required: false,
  })
  connect?: any;
}

class ProfileCreateBody implements Prisma.ProfileBaseCreateInput {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  name?: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @ApiProperty()
  auth?: CreatePrismaRelation;
}

class ProfileUpdateBody implements Prisma.ProfileBaseUpdateInput {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  name?: string | null;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  email?: string | null;

  @ApiProperty()
  id: string;
}

@ApiTags('profile')
@Controller({
  path: 'profile',
  version: '1',
})
export class ProfileBaseController {
  constructor(private profileBaseService: ProfileBaseService) {}

  @ApiResponse({
    type: ProfileFindOneResponse,
    status: 200,
  })
  @Get()
  findOne(@Query() args: ProfileFindOneQuery): Promise<ProfileBase> {
    return this.profileBaseService.user({ id: args.id });
  }

  @ApiResponse({
    type: ProfileFindOneResponse,
    status: 201,
  })
  @Post()
  create(@Body() data: ProfileCreateBody) {
    return this.profileBaseService.createProfile(data);
  }

  @ApiResponse({
    type: ProfileUpdateBody,
  })
  @Patch()
  update(@Body() { name, email, id }: ProfileUpdateBody) {
    return this.profileBaseService.updateProfile({
      data: cleaner({
        name,
        email,
      }),
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.profileBaseService.deleteProfile({ id });
  }
}
