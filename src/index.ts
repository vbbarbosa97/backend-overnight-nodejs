import { SetupServer } from './server';
import config from 'config';

(async (): Promise<void> => {
  const port = config.get<number>('App.port');
  const server = new SetupServer(port);

  await server.init();
  server.start();
})();
