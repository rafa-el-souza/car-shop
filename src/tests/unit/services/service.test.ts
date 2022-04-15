import { expect } from 'chai';
import sinon from 'sinon';
import { CarService } from '../../../services';
import { CarModel } from '../../../models';
import { createCarInput, createCarOutput, mockId, readCarsOutput, readOneCarOutput, updateCarInput, updateCarOutput } from '../utils';

describe('01 - CarService', () => {

  describe('a) CarService.create', () => {
    const stub = sinon.stub(new CarModel(), 'create');
    before(() => {
      stub.resolves(createCarOutput);
    })
    after(() => {
      stub.reset();
    })

    it('Returns created car', () => {
      new CarService().create({ ...createCarInput })
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(createCarOutput);
        });
    })
  })

  describe('b) CarService.read', () => {
    const stub = sinon.stub(new CarModel(), 'read');
    before(() => {
      stub.resolves(readCarsOutput);
    })
    after(() => {
      stub.reset();
    })

    it('Returns list of cars', () => {
      new CarService().read()
        .then((output) => {
          expect(output).to.be.an('array');
          expect(output[0]).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readCarsOutput);
        });
    })
  })

  describe('c) CarService.readOne', () => {
    const stub = sinon.stub(new CarModel(), 'readOne');
    before(() => {
      stub.resolves(readOneCarOutput);
    })
    after(() => {
      stub.reset();
    })

    it('Returns one car', () => {
      new CarService().readOne(mockId)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readOneCarOutput);
        });
    })
  })

  describe('d) CarService.update', () => {
    const stub = sinon.stub(new CarModel(), 'update');
    before(() => {
      stub.resolves(updateCarOutput);
    })
    after(() => {
      stub.reset();
    })

    it('Returns updated car', () => {
      new CarService().update(mockId, updateCarInput)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(updateCarOutput);
        });
    })
  })

  describe('e) CarService.delete', () => { // bad test
    const stub = sinon.stub(new CarModel(), 'update');
    before(() => {
      stub.resolves(null);
    })
    after(() => {
      stub.reset();
    })

    it('Returns nothing', () => {
      new CarService().delete(mockId)
        .then((output) => {
          expect(output).to.be('null');
        });
    })
  })
})