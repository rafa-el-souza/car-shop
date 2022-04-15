import { Router } from 'express';

import { Controller as GenericController } from '../controllers';

export class CustomRouter<T> {
  public router: Router;

  constructor(
    private controller: GenericController<T>,
    private route: string = controller.route,
  ) {
    this.router = Router();
    this.addGetRoutes();
    this.addPostRoutes();
    this.addPutRoutes();
    this.addDeleteRoutes();
  }

  private addGetRoutes = () => {
    this.router.get(
      this.route,
      this.controller.read,
    );
    this.router.get(
      `${this.route}/:id`,
      this.controller.validateId,
      this.controller.readOne,
    );
  };

  private addPostRoutes = () => {
    this.router.post(
      this.route,
      this.controller.validateBody,
      this.controller.create,
    );
  };

  private addPutRoutes = () => {
    this.router.put(
      `${this.route}/:id`,
      this.controller.validateId,
      this.controller.validateBody,
      this.controller.update,
    );
  };

  private addDeleteRoutes = () => {
    this.router.delete(
      `${this.route}/:id`,
      this.controller.validateId,
      this.controller.delete,
    );
  };
}

export default CustomRouter;
