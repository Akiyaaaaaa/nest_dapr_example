import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post('bark/:actorId')
  async invokeDogBarkActorMethod(@Param('actorId') actorId: string) {
    return this.actorService.invokeDogBarkActorMethod(actorId);
  }

  @Post('run/:actorId')
  async invokeDogRunActorMethod(@Param('actorId') actorId: string) {
    return this.actorService.invokeDogRunActorMethod(actorId);
  }
}
