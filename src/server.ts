import App from './app';

import {
  handleDomainError,
  handleInternalError,
  handleZodDomainError,
} from './errors';

import { CarFactory, MotorcycleFactory } from './factories';

const server = new App();

server.addRouter(CarFactory().router);

server.addRouter(MotorcycleFactory().router);

server.app.use(handleDomainError);

server.app.use(handleZodDomainError);

server.app.use(handleInternalError);

export default server;
