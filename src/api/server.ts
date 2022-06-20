import App from './api';

import {
  handleDomainError,
  handleInternalError,
  handleZodDomainError,
} from '../app/helpers/errors';

import { CarFactory, MotorcycleFactory } from '../app/helpers/factories';

const server = new App();

server.addRouter(CarFactory().router);

server.addRouter(MotorcycleFactory().router);

server.app.use(handleDomainError);

server.app.use(handleZodDomainError);

server.app.use(handleInternalError);

export default server;
