import { Router } from 'express';

import { Controller as GenericController } from '../../app/controllers';

export class CustomRouter<T> {
  public router: Router;

  constructor(
    private controller: GenericController<T>,
    private _route: string = controller.route,
  ) {
    this.router = Router();
    this.addGetRoutes();
    this.addPostRoutes();
    this.addPutRoutes();
    this.addDeleteRoutes();
  }

  private addGetRoutes = () => {
    this.router.get(
      this._route,
      this.controller.read,
    );
    this.router.get(
      `${this._route}/:id`,
      this.controller.validateId,
      this.controller.readOne,
    );
  };

  private addPostRoutes = () => {
    this.router.post(
      this._route,
      this.controller.validateBody,
      this.controller.create,
    );
  };

  private addPutRoutes = () => {
    this.router.put(
      `${this._route}/:id`,
      this.controller.validateId,
      this.controller.validateBody,
      this.controller.update,
    );
  };

  private addDeleteRoutes = () => {
    this.router.delete(
      `${this._route}/:id`,
      this.controller.validateId,
      this.controller.delete,
    );
  };
}

export default CustomRouter;
