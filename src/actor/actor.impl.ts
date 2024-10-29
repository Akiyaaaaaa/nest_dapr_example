// parking-sensor-actor.ts
import { AbstractActor } from '@dapr/dapr';
import DogFightInterface from './actor.interface';

export default class DogFightActorImpl
  extends AbstractActor
  implements DogFightInterface
{
  async dogBark(): Promise<void> {
    console.log('Dog Barking!!!!!');
    await this.getStateManager().setState('occupied', true);
    await this.getStateManager().saveState();
  }

  async dogRun(): Promise<void> {
    console.log('Dog Running!!!!');
    await this.getStateManager().setState('occupied', false);
    await this.getStateManager().saveState();
  }

  async getState<T>(key: string): Promise<T | null> {
    return await this.getStateManager<T>().getState(key);
  }

  async onActivate(): Promise<void> {
    console.log('Actor activated.');
  }
}
