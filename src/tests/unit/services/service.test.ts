import { expect } from 'chai';
import sinon from 'sinon';
import { CarService } from '../../../services';
import { CarModel } from '../../../models';
import { createCarInput, createCarOutput, deleteCarOutput, mockId, readCarsOutput, readOneCarOutput, updateCarInput, updateCarOutput } from '../utils';

describe('01 - CarService', () => {
  const modelStub = new CarModel();

  describe('a) CarService.create', () => {

    before(() => {
      sinon
        .stub(modelStub, 'create')
        .resolves(createCarOutput);
    })
    after(() => {
      sinon.restore();
    })

    it('Returns created car', () => {
      new CarService(modelStub).create(createCarInput)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(createCarOutput);
        });
    })
  })

  describe('b) CarService.read', () => {

    before(() => {
      sinon
        .stub(modelStub, 'read')
        .resolves(readCarsOutput);
    })
    after(() => {
      sinon.restore();
    })

    it('Returns list of cars', () => {
      new CarService(modelStub).read()
        .then((output) => {
          expect(output).to.be.an('array');
          expect(output[0]).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readCarsOutput);
        });
    })
  })

  describe('c) CarService.readOne', () => {

    before(() => {
      sinon
        .stub(modelStub, 'readOne')
        .resolves(readOneCarOutput);
    })
    after(() => {
      sinon.restore();
    })

    it('Returns one car', () => {
      new CarService(modelStub).readOne(mockId)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readOneCarOutput);
        });
    })
  })

  describe('d) CarService.update', () => {

    before(() => {
      sinon
        .stub(modelStub, 'update')
        .resolves(updateCarOutput);
    })
    after(() => {
      sinon.restore();
    })

    it('Returns updated car', () => {
      new CarService(modelStub).update(mockId, updateCarInput)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(updateCarOutput);
        });
    })
  })

  describe('e) CarService.delete', () => {

    before(() => {
      sinon
        .stub(modelStub, 'delete')
        .resolves(null);
    })
    after(() => {
      sinon.restore();
    })

    it('Returns nothing', () => {
      new CarService(modelStub).delete(mockId)
        .then((output) => {
          expect(output).to.be('null');
        });
    })
  })
})