import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  CarController,
  MotorcycleController
} from '../../../app/controllers';

import {
  CarService,
  MotorcycleService
} from '../../../app/services';

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
  StatusCodes as c
} from '../../../app/helpers/interfaces';

import { ErrorMessage as m } from '../../../app/helpers/errors';
import { carSchema, motorcycleSchema } from '../../../app/helpers/validations';

describe('Car Controller', () => {
  const serviceStub = new CarService();

  describe('a) CarController.create', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'create')
          .resolves(createCarOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 201 with created object', async () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        await new CarController(serviceStub).create(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.created)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(createCarOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'create')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest(createCarInput, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).create(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }

        })
      })
    })
  })

  describe('b) CarController.read', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'read')
          .resolves(readCarsOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with an array of cars', async () => {
        const req = mockRequest({}, {});
        const res = mockResponse();
        await new CarController(serviceStub).read(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(readCarsOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'read')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({}, {});
          const res = mockResponse();
          try {
            await new CarController(serviceStub).read(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })
    })
  })

  describe('c) CarController.readOne', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'readOne')
          .resolves(readOneCarOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with an one car', async () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        await new CarController(serviceStub).readOne(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(readOneCarOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'readOne')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).readOne(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Car not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'readOne')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes a 404 error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).readOne(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('d) CarController.update', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'update')
          .resolves(updateCarOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with updated car', async () => {
        const req = mockRequest(updateCarInput, { id: mockId });
        const res = mockResponse();
        await new CarController(serviceStub).update(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(updateCarOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'update')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).update(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Car not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'update')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes a 404 error to next function', async () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).update(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('e) CarController.delete', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'delete')
          .resolves(deleteCarOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns empty body', async () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        await new CarController(serviceStub).delete(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.noContent)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({})).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'delete')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).delete(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Car not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'delete')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes a 404 error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new CarController(serviceStub).delete(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('f) CarController.validateBody', () => {
    const schemaStub = carSchema;

    describe('Success', () => {

      before(() => {
        sinon
          .stub(schemaStub, 'parse')
          .returns(readOneCarOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns next()', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        try {
          new CarController(serviceStub, '/cars', schemaStub)
            .validateBody(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            );
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
        }
      })
    })

    describe('Failure', () => {

      before(() => {
        sinon
          .stub(schemaStub, 'parse')
          .throws({ error: {} }); // rejects
      })
      after(() => {
        sinon.restore();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        try {
          new CarController(serviceStub, '/cars', schemaStub)
            .validateBody(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
          expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
        }
      })
    })
  })

  describe('g) CarController.validateId', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(mongoose.Types.ObjectId, 'isValid')
          .returns(true);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns next()', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        try {
          new CarController().validateId(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
        }
      })
    })

    describe('Failure', () => {

      before(() => {
        sinon
          .stub(mongoose.Types.ObjectId, 'isValid')
          .returns(false);
      })
      after(() => {
        sinon.restore();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createCarInput, { id: mockId });
        const res = mockResponse();
        try {
          new CarController().validateId(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
          expect((nextStub as sinon.SinonStub).calledWith({ code: c.badRequest, message: m.invalidId })).to.be.true;
        }
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

describe('Motorcycle Controller', () => {
  const serviceStub = new MotorcycleService();

  describe('a) MotorcycleController.create', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'create')
          .resolves(createMotorcycleOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 201 with created object', async () => {
        const req = mockRequest(createMotorcycleInput);
        const res = mockResponse();
        await new MotorcycleController(serviceStub).create(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.created)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(createMotorcycleOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'create')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest(createMotorcycleInput);
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).create(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })
    })
  })

  describe('b) MotorcycleController.read', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'read')
          .resolves(readMotorcyclesOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with an array of cars', async () => {
        const req = mockRequest({});
        const res = mockResponse();
        await new MotorcycleController(serviceStub).read(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(readMotorcyclesOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'read')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({});
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).read(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })
    })
  })

  describe('c) MotorcycleController.readOne', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'readOne')
          .resolves(readOneMotorcycleOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with an one car', async () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        await new MotorcycleController(serviceStub).readOne(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(readOneMotorcycleOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'readOne')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).readOne(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'readOne')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an 404 error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).readOne(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('d) MotorcycleController.update', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'update')
          .resolves(updateMotorcycleOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns response 200 with updated car', async () => {
        const req = mockRequest(updateMotorcycleInput, { id: mockId });
        const res = mockResponse();
        await new MotorcycleController(serviceStub).update(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.ok)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(updateMotorcycleOutput)).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'update')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest(updateMotorcycleInput, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).update(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'update')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an 404 error to next function', async () => {
          const req = mockRequest(updateMotorcycleInput, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).update(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('e) MotorcycleController.delete', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(serviceStub, 'delete')
          .resolves(deleteMotorcycleOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns empty body', async () => {
        const req = mockRequest({}, { id: mockId });
        const res = mockResponse();
        await new MotorcycleController(serviceStub).delete(
          req as Request<{ id: string; }>,
          res as unknown as Response,
          nextStub,
        )
        expect((res.status as sinon.SinonStub).calledWith(c.noContent)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({})).to.be.true;
      })
    })

    describe('Failure', () => {

      describe('Internal error', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'delete')
            .rejects({ error: {} });
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).delete(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
          }
        })
      })

      describe('Motorcycle not found', () => {

        before(() => {
          sinon
            .stub(serviceStub, 'delete')
            .resolves(null);
        })
        after(() => {
          sinon.restore();
        })

        it('Passes an 404 error to next function', async () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          try {
            await new MotorcycleController(serviceStub).delete(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
          } catch (error) {
            expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
            expect((nextStub as sinon.SinonStub).calledWith({ code: c.notFound, message: m.notFound })).to.be.true;
          }
        })
      })
    })
  })

  describe('f) MotorcycleController.validateBody', () => {
    const schemaStub = motorcycleSchema;

    describe('Success', () => {

      before(() => {
        sinon
          .stub(schemaStub, 'parse')
          .returns(createMotorcycleOutput);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns next()', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        try {
          new MotorcycleController(serviceStub, '/motorcycles', schemaStub)
            .validateBody(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            );
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
        }
      })
    })

    describe('Failure', () => {

      before(() => {
        sinon
          .stub(schemaStub, 'parse')
          .throws({ error: {} });
      })
      after(() => {
        sinon.restore();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        try {
          new MotorcycleController(serviceStub, '/motorcycles', schemaStub)
            .validateBody(
              req as Request<{ id: string; }>,
              res as unknown as Response,
              nextStub,
            )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
          expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
        }
      })
    })
  })

  describe('g) MotorcycleController.validateId', () => {

    describe('Success', () => {

      before(() => {
        sinon
          .stub(mongoose.Types.ObjectId, 'isValid')
          .returns(true);
      })
      after(() => {
        sinon.restore();
      })

      it('Returns next()', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        try {
          new MotorcycleController().validateId(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
        }
      })
    })

    describe('Failure', () => {

      before(() => {
        sinon
          .stub(mongoose.Types.ObjectId, 'isValid')
          .returns(false);
      })
      after(() => {
        sinon.restore();
      })

      it('Throws error and passes it to next function', () => {
        const req = mockRequest(createMotorcycleInput, { id: mockId });
        const res = mockResponse();
        try {
          new MotorcycleController().validateId(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
        } catch (error) {
          expect((nextStub as sinon.SinonStub).calledOnce).to.be.true;
          expect((nextStub as sinon.SinonStub).calledWith({ error: {} })).to.be.true;
        }
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