import { Injectable, Logger } from '@nestjs/common';
import { DaprClient, DaprServer } from '@dapr/dapr';

@Injectable()
export class PubSubService {
  private readonly logger = new Logger(PubSubService.name);
  private readonly daprClient: DaprClient;
  private readonly daprServer: DaprServer;

  private serverHost = process.env.DAPR_SERVER_HOST;
  private serverPort = process.env.DAPR_SERVER_PORT;
  private daprHost = process.env.DAPR_HOST;
  private daprPort = process.env.DAPR_PORT;

  constructor() {
    this.daprClient = new DaprClient();
    this.daprServer = new DaprServer({
      serverHost: this.serverHost,
      serverPort: this.serverPort,
      clientOptions: {
        daprHost: this.daprHost,
        daprPort: this.daprPort,
      },
    });
  }

  async publishMessage(topic: string, message: any) {
    try {
      await this.daprClient.pubsub.publish('pubsub', topic, message);
      this.logger.log(
        `Published message to topic ${topic}: ${JSON.stringify(message)}`,
      );
    } catch (error) {
      this.logger.error(`Error publishing message: ${error}`);
    }
  }

  async subscribeMessage(topic: string, callback: (data: any) => void) {
    await this.daprServer.pubsub.subscribe(
      'pubsub',
      topic,
      async (data: any) => {
        this.logger.log(
          `Received message from topic ${topic}: ${JSON.stringify(data)}`,
        );
        callback(data);
      },
    );
  }
}
