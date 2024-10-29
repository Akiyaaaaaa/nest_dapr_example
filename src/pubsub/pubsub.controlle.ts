import { Controller, Post, Body, Logger } from '@nestjs/common';
import { PubSubService } from './pubsub.service';

@Controller('pubsub')
export class PubSubController {
  private readonly logger = new Logger(PubSubController.name);

  constructor(private readonly pubSubService: PubSubService) {}

  @Post('publish')
  async publish(@Body('topic') topic: string, @Body('message') message: any) {
    await this.pubSubService.publishMessage(topic, message);
    return { status: 'Message published' };
  }
}
