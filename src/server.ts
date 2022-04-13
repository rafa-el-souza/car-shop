import App from './app';

import { errorMiddleware } from './errors';

import { CarFactory } from './factories';

const server = new App();

server.addRouter(CarFactory().router);

server.app.use(errorMiddleware);

export default server;
