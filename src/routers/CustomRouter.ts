import { Router } from 'express';

import { Controller as GenericController } from '../controllers';

export class CustomRouter<T> {
  public router: Router;

  constructor(
    private controller: GenericController<T>,
    private route: string = controller.route,
  ) {
    this.router = Router();
    this.addRoute();
  }

  private addRoute = () => {
    this.router.get(this.route, this.controller.read);
    this.router.get(`${this.route}/:id`, this.controller.readOne);
    this.router.post(
      this.route,
      this.controller.create,
    );
    this.router.put(`${this.route}/:id`, this.controller.update);
    this.router.delete(`${this.route}/:id`, this.controller.delete);
  };
}

export default CustomRouter;
