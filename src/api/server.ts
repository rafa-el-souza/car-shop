import swaggerUi from 'swagger-ui-express';

import Api from './api';

import {
  handleDomainError,
  handleInternalError,
  handleZodDomainError } from './middlewares';

import { CarFactory, MotorcycleFactory } from './helpers';

import swaggerDocs from './helpers/swagger.json';

const server = new Api();

server.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.addRouter(CarFactory().router);

server.addRouter(MotorcycleFactory().router);

server.app.use(handleDomainError);

server.app.use(handleZodDomainError);

server.app.use(handleInternalError);

export default server;
