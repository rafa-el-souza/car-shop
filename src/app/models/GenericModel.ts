import { Model as M, Document } from 'mongoose';

import { Model as IModel } from '../helpers/interfaces';

export abstract class Model<T> implements IModel<T> {
  constructor(
    protected model: M<T & Document>,
  ) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findById(id);

  update = async (id: string, obj: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id: id }, { ...obj });

  delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}

export default Model;