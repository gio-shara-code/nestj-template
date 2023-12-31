import { ApiProperty, ApiParam, ApiQuery } from '@nestjs/swagger';

export class GetUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}

export class UserQuery {
  @ApiProperty({
    nullable: true,
  })
  id: string;

  @ApiProperty({
    nullable: true,
  })
  someOtherId: string;
}

export class UserParam {
  @ApiProperty({
    nullable: true,
  })
  userId: string;
}
export class CreateUserResponse {
  @ApiProperty()
  id: string;
}

export class CreateUserBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}
