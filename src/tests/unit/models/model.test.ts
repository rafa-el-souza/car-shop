import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { CarModel } from '../../../models';
import { createCarInput, createCarOutput, readCarsOutput, readOneCarOutput, updateCarInput, updateCarOutput } from '../utils';

describe('01 - CarModel', () => {
  describe('a) CarModel.create', () => {
    const stub = sinon.stub(mongoose.Model, 'create');
    before(() => {
      stub.resolves(createCarOutput);
    })
    after(() => {
      stub.reset();
    })
    it('Returns created car', () => {

      new CarModel().create({ ...createCarInput })
      .then((output) => {
        expect(output).to.be.an('object');
        expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
        expect(output).to.be.deep.equal(createCarOutput);
      });
    })
  })

  describe('b) CarModel.read', () => {
    const stub = sinon.stub(mongoose.Model, 'find');
    before(() => {
      stub.resolves(readCarsOutput);
    })
    after(() => {
      stub.reset();
    })
    it('Returns list of cars', () => {
      new CarModel().read()
        .then((output) => {
          expect(output).to.be.an('array');
          expect(output[0]).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readCarsOutput);
        });
    })
  })

  describe('c) CarModel.readOne', () => {
    const stub = sinon.stub(mongoose.Model, 'findById');
    before(() => {
      stub.resolves(readOneCarOutput);
    })
    after(() => {
      stub.reset();
    })
    it('Returns one car', () => {
      new CarModel().readOne('62582213a86d802c9d915bb5')
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(readOneCarOutput);
        });
    })
  })

  describe('d) CarModel.update', () => {
    const stub = sinon.stub(mongoose.Model, 'findOneAndUpdate');
    before(() => {
      stub.resolves(updateCarOutput);
    })
    after(() => {
      stub.reset();
    })
    it('Returns updated car', () => {
      new CarModel().update("4edd40c86762e0fb12000003", updateCarInput)
        .then((output) => {
          expect(output).to.be.an('object');
          expect(output).to.have.all.keys(['model', 'year', 'color', 'buyValue', "doorsQty", "seatsQty", '_id']);
          expect(output).to.be.deep.equal(updateCarOutput);
        });
    })
  })

  describe('e) CarModel.delete', () => {
    const stub = sinon.stub(mongoose.Model, 'findOneAndDelete');
    before(() => {
      stub.resolves(null);
    })
    after(() => {
      stub.reset();
    })
    it('Returns nothing', () => {
      new CarModel().delete("4edd40c86762e0fb12000003")
        .then((output) => {
          expect(output).to.be('null');
        });
    })
  })
})