import { expect } from 'chai';
import sinon from 'sinon';
import { CarService } from '../../../services';
import { createCarOutput } from '../utils';

describe('01 - CarController', () => {
  describe('a) CarController.create', () => {
    const serviceStub = sinon.stub(new CarService(), 'create')
    before(() => {
      serviceStub.resolves(createCarOutput);
    })
    after(() => {
      serviceStub.reset();
    })
  })
})

// maybe test generic abstract classes instead of specific ones