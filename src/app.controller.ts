import { Controller, Get, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Version('1')
  @Get()
  get() {
    return {
      appName: 'nestjs_template',
      live: true,
    };
  }
}
