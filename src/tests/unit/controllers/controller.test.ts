import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

import {
  CarController,
  MotorcycleController
} from '../../../controllers';

import {
  CarService,
  MotorcycleService
} from '../../../services';

import {
  createCarInput,
  createCarOutput,
  createMotorcycleInput,
  createMotorcycleOutput,
  deleteCarOutput,
  deleteMotorcycleOutput,
  mockId,
  mockRequest,
  mockResponse,
  mongooseValidatorStub,
  nextStub,
  readCarsOutput,
  readMotorcyclesOutput,
  readOneCarOutput,
  readOneMotorcycleOutput,
  updateCarInput,
  updateCarOutput,
  updateMotorcycleInput,
  updateMotorcycleOutput
} from '../utils';

import {
  Motorcycle,
  StatusCodes as c
} from '../../../interfaces';

import { ErrorMessage as m } from '../../../errors';

describe('01 - CarController', () => {

  describe('a) CarController.create', () => {
    const serviceStub = sinon.stub(new CarService(), 'create');
    
    describe('Success', () => {

      before(() => {
        serviceStub.resolves(createCarOutput);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 201 with created object', () => {
        const req = mockRequest(createCarInput);
        const res = mockResponse();
        new CarController().create(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status().calledWith(c.created)).to.be.true;
            expect(res.json().calledOnceWith(createCarOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest();
          const res = mockResponse();
          new CarController().create(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then((result) => {
              // console.log('result: ', result);
              // console.log('assertion: ', nextStub.calledOnceWith({ error: {} }))
              expect(nextStub.calledOnce).to.be.true;
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })
    })
  })

  describe('b) CarController.read', () => {
    const serviceStub = sinon.stub(new CarService(), 'read');

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readCarsOutput);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with an array of cars', () => {
        const req = mockRequest({});
        const res = mockResponse();
        new CarController().read(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(readCarsOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {
      
      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({});
          const res = mockResponse();
          new CarController().read(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })
    })
  })

  describe('c) CarController.readOne', () => {
    const serviceStub = sinon.stub(new CarService(), 'readOne');

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readOneCarOutput);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with an one car', () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        new CarController().readOne(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(readOneCarOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Car not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('d) CarController.update', () => {
    const serviceStub = sinon.stub(new CarService(), 'update')

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(updateCarOutput);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with updated car', () => {
        const req = mockRequest(updateCarInput, { id: mockId });
        const res = mockResponse();
        new CarController().update(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(updateCarOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          new CarController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Car not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          new CarController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('e) CarController.delete', () => {
    const serviceStub = sinon.stub(new CarService(), 'delete')

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(deleteCarOutput);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns empty body', () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        new CarController().delete(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.noContent)).to.be.true;
            expect(res.json()?.calledOnceWith({})).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Car not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('f) CarController.validateBody', () => {
    const zodParserStub = sinon.stub(new CarController().schema, 'parse');

    describe('Success', () => {

      before(() => {
        zodParserStub.resolves(true);
      })
      after(() => {
        zodParserStub.reset();
      })

      it('Returns next()', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        new CarController().validateBody(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        );
        expect(nextStub.calledOnce).to.be.true;
      })
    })

    describe('Failure', () => {

      before(() => {
        zodParserStub.throws({ error: {} });
      })
      after(() => {
        zodParserStub;
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        new CarController().validateBody(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
      })
    })
  })
  
  describe('g) CarController.validateId', () => {

    describe('Success', () => {

      before(() => {
        mongooseValidatorStub.returns(true);
      })
      after(() => {
        mongooseValidatorStub.reset();
      })

      it('Returns next()', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        new CarController().validateId(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnce).to.be.true;
      })
    })

    describe('Failure', () => {

      before(() => {
        mongooseValidatorStub.returns(false);
      })
      after(() => {
        mongooseValidatorStub.reset();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        new CarController().validateId(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
      })
    })
  })

  describe('g) CarController.getRoute', () => {

    describe('Success', () => {
      it('Returns the route string', () => {
        const route = new CarController().route;
        expect(route).to.equal('/cars');
      })
    })
  })
})

describe('02 - MotorcycleController', () => {

  describe('a) MotorcycleController.create', () => {
    const serviceStub = sinon.stub(new MotorcycleService(), 'create')

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(createMotorcycleOutput as Motorcycle);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 201 with created object', () => {
        const req = mockRequest(createMotorcycleInput);
        const res = mockResponse();
        new MotorcycleController().create(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.created)).to.be.true;
            expect(res.json()?.calledOnceWith(createMotorcycleOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest(createMotorcycleInput);
          const res = mockResponse();
          new MotorcycleController().create(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })
    })
  })

  describe('b) MotorcycleController.read', () => {
    const serviceStub = sinon.stub(new MotorcycleService(), 'read')

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readMotorcyclesOutput as Motorcycle[]);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with an array of cars', () => {
        const req = mockRequest({});
        const res = mockResponse();
        new MotorcycleController().read(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(readMotorcyclesOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {
      
      describe('Internal error', () => {
        
        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({});
          const res = mockResponse();
          new MotorcycleController().read(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })
    })
  })

  describe('c) MotorcycleController.readOne', () => {
    const serviceStub = sinon.stub(new MotorcycleService(), 'readOne');

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readOneMotorcycleOutput as Motorcycle);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with an one car', () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().readOne(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(readOneMotorcycleOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('d) MotorcycleController.update', () => {
    const serviceStub = sinon.stub(new MotorcycleService(), 'update');

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(updateMotorcycleOutput as Motorcycle);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns response 200 with updated car', () => {
        const req = mockRequest(updateMotorcycleInput, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().update(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.ok)).to.be.true;
            expect(res.json()?.calledOnceWith(updateMotorcycleOutput)).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest(updateMotorcycleInput, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest(updateMotorcycleInput, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('e) MotorcycleController.delete', () => {
    const serviceStub = sinon.stub(new MotorcycleService(), 'delete');

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(deleteMotorcycleOutput as Motorcycle);
      })
      after(() => {
        serviceStub.reset();
        nextStub.reset();
      })

      it('Returns empty body', () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().delete(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
          .then(() => {
            expect(res.status()?.calledOnceWith(c.noContent)).to.be.true;
            expect(res.json()?.calledOnceWith({})).to.be.true;
          })
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          serviceStub.throws({ error: {} });
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
            })
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          serviceStub.resolves(null);
        })
        after(() => {
          serviceStub.reset();
          nextStub.reset();
        })

        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new MotorcycleController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound })).to.be.true;
            })
        })
      })
    })
  })

  describe('f) MotorcycleController.validateBody', () => {
    const zodParserStub = sinon.stub(new MotorcycleController().schema, 'parse');

    describe('Success', () => {

      before(() => {
        zodParserStub.resolves(true);
      })
      after(() => {
        zodParserStub.reset();
      })

      it('Returns next()', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().validateBody(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        );
        expect(nextStub.calledOnce).to.be.true;
      })
    })

    describe('Failure', () => {

      before(() => {
        zodParserStub.throws({ error: {} });
      })
      after(() => {
        zodParserStub;
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().validateBody(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
      })
    })
  })

  describe('g) MotorcycleController.validateId', () => {

    describe('Success', () => {

      before(() => {
        mongooseValidatorStub.returns(true);
      })
      after(() => {
        mongooseValidatorStub.reset();
      })

      it('Returns next()', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().validateId(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnce);
      })
    })

    describe('Failure', () => {

      before(() => {
        mongooseValidatorStub.returns(false);
      })
      after(() => {
        mongooseValidatorStub.reset();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        new MotorcycleController().validateId(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect(nextStub.calledOnceWith({ error: {} })).to.be.true;
      })
    })
  })

  describe('g) MotorcycleController.getRoute', () => {

    describe('Success', () => {
      it('Returns the route string', () => {
        const route = new MotorcycleController().route;
        expect(route).to.equal('/motorcycles');
      })
    })
  })
})