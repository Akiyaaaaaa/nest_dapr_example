import { DaprServer } from '@dapr/dapr';
import DogFightActorImpl from './actor.impl';

const serverHost = process.env.DAPR_SERVER_HOST;
const serverPort = process.env.DAPR_SERVER_PORT;
const daprHost = process.env.DAPR_HOST;
const daprPort = process.env.DAPR_PORT;

const daprServer = new DaprServer({
  serverHost,
  serverPort,
  clientOptions: {
    daprHost,
    daprPort,
  },
});

export default async function saveActorState() {
  try {
    await daprServer.actor.init();
    await daprServer.actor.registerActor(DogFightActorImpl);
    await daprServer.start();
    return 'Actor registered successfully';
  } catch (error) {
    return 'Register actor error ' + error;
  }
}
