import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprClient } from '@dapr/dapr';
import { PubSubController } from './pubsub/pubsub.controlle';
import { PubSubService } from './pubsub/pubsub.service';
import { ActorController } from './actor/actor.controller';
import { ActorService } from './actor/actor.service';

@Module({
  imports: [],
  controllers: [AppController, PubSubController, ActorController],
  providers: [
    AppService,
    PubSubService,
    ActorService,
    Logger,
    {
      provide: DaprClient,
      useValue: new DaprClient(),
    },
  ],
})
export class AppModule {}
