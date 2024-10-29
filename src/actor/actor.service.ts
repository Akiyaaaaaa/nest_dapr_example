import { Injectable, Logger } from '@nestjs/common';
import { DaprClient, DaprServer, ActorId, ActorProxyBuilder } from '@dapr/dapr';
import DogFightInterface from './actor.interface';
import DogFightActorImpl from './actor.impl';

@Injectable()
export class ActorService {
  private readonly logger = new Logger(ActorService.name);
  private readonly daprClient: DaprClient;
  private readonly daprServer: DaprServer;

  private serverHost = process.env.DAPR_SERVER_HOST;
  private serverPort = process.env.DAPR_SERVER_PORT;
  private daprHost = process.env.DAPR_HOST;
  private daprPort = process.env.DAPR_PORT;

  constructor() {
    this.daprClient = new DaprClient({
      daprHost: this.daprHost,
      daprPort: this.daprPort,
    });
    this.daprServer = new DaprServer({
      serverHost: this.serverHost,
      serverPort: this.serverPort,
      clientOptions: {
        daprHost: this.daprHost,
        daprPort: this.daprPort,
      },
    });
  }

  async invokeDogBarkActorMethod(actorId: string) {
    try {
      const builder = new ActorProxyBuilder<DogFightInterface>(
        DogFightActorImpl,
        this.daprClient,
      );
      const actor = builder.build(new ActorId('my-actor'));
      await actor.dogBark();
      return 'Actor method invoked';
    } catch (error) {
      console.log('Error calling actor method', error);
      return `Error calling actor method ${error}`;
    }
  }

  async invokeDogRunActorMethod(actorId: string) {
    const builder = new ActorProxyBuilder<DogFightInterface>(
      DogFightActorImpl,
      this.daprClient,
    );
    const actor = builder.build(new ActorId(actorId));
    const response = actor.dogRun();
    return response;
  }
}
