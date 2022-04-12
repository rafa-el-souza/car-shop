import { Model as IModel } from '../interfaces';

export abstract class Service<T> {
  constructor(
    protected model: IModel<T>,
  ) {}

  create = (obj: T): Promise<T> => this.model.create(obj)
    .then((result) => result);

  read = (): Promise<T[]> => this.model.read()
    .then((result) => result);

  readOne = (id: string): Promise<T | null> => this.model.readOne(id)
    .then((result) => result);

  update = (
    id: string,
    obj: T,
  ): Promise<T | null> => this.model.update(id, obj)
    .then((result) => result);

  delete = (id: string): Promise<T | null> => this.model.delete(id)
    .then((result) => result);
}

export default Service;