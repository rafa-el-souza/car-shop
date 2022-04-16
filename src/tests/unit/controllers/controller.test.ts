import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { CarController } from '../../../controllers';
import { CarService } from '../../../services';
import { createCarInput, createCarOutput, deleteCarOutput, mockId, mockRequest, mockResponse, readCarsOutput, readOneCarOutput, updateCarInput, updateCarOutput } from '../utils';
import { StatusCodes as c } from '../../../interfaces';
import { ErrorMessage as m } from '../../../errors';

describe('01 - CarController', () => {

  describe('a) CarController.create', () => {
    const serviceStub = sinon.stub(new CarService(), 'create')
    const nextStub = sinon.stub();

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(createCarOutput);
      })
      after(() => {
        serviceStub.reset();
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
            expect(res.status()?.calledOnceWith(c.created));
            expect(res.json()?.calledOnceWith(createCarOutput));
          })
      })
    })

    describe('Failure', () => {

      before(() => {
        serviceStub.throws({ error: {} });
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Internal error', () => {
        it('Passes an error to next function', () => {
          const req = mockRequest(createCarInput);
          const res = mockResponse();
          new CarController().create(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} }));
            })
        })
      })
    })
  })

  describe('b) CarController.read', () => {
    const serviceStub = sinon.stub(new CarService(), 'read')
    const nextStub = sinon.stub();

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readCarsOutput);
      })
      after(() => {
        serviceStub.reset();
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
            expect(res.status()?.calledOnceWith(c.ok));
            expect(res.json()?.calledOnceWith(readCarsOutput));
          })
      })
    })

    describe('Failure', () => {

      before(() => {
        serviceStub.throws({ error: {} });
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Internal error', () => {

        it('Passes an error to next function', () => {
          const req = mockRequest({});
          const res = mockResponse();
          new CarController().read(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} }));
            })
        })
      })
    })
  })

  describe('c) CarController.readOne', () => {
    const serviceStub = sinon.stub(new CarService(), 'readOne')
    const nextStub = sinon.stub();

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(readOneCarOutput);
      })
      after(() => {
        serviceStub.reset();
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
            expect(res.status()?.calledOnceWith(c.ok));
            expect(res.json()?.calledOnceWith(readOneCarOutput));
          })
      })
    })

    describe('Failure', () => {

      before(() => {
        serviceStub.throws({ error: {} });
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Internal error', () => {
        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} }));
            })
        })
      })

      before(() => {
        serviceStub.resolves(null);
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Car not found', () => {
        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().readOne(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound }));
            })
        })
      })
    })
  })

  describe('d) CarController.update', () => {
    const serviceStub = sinon.stub(new CarService(), 'update')
    const nextStub = sinon.stub();

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(updateCarOutput);
      })
      after(() => {
        serviceStub.reset();
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
            expect(res.status()?.calledOnceWith(c.ok));
            expect(res.json()?.calledOnceWith(updateCarOutput));
          })
      })
    })

    describe('Failure', () => {

      before(() => {
        serviceStub.throws({ error: {} });
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Internal error', () => {
        it('Passes an error to next function', () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          new CarController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} }));
            })
        })
      })

      before(() => {
        serviceStub.resolves(null);
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Car not found', () => {
        it('Passes an 404 error to next function', () => {
          const req = mockRequest(updateCarInput, { id: mockId });
          const res = mockResponse();
          new CarController().update(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound }));
            })
        })
      })
    })
  })

  describe('e) CarController.delete', () => {
    const serviceStub = sinon.stub(new CarService(), 'delete')
    const nextStub = sinon.stub();

    describe('Success', () => {

      before(() => {
        serviceStub.resolves(deleteCarOutput);
      })
      after(() => {
        serviceStub.reset();
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
            expect(res.status()?.calledOnceWith(c.noContent));
            expect(res.json()?.calledOnceWith({}));
          })
      })
    })

    describe('Failure', () => {

      before(() => {
        serviceStub.throws({ error: {} });
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Internal error', () => {
        it('Passes an error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ error: {} }));
            })
        })
      })

      before(() => {
        serviceStub.resolves(null);
      })
      after(() => {
        serviceStub.reset();
      })

      describe('Car not found', () => {
        it('Passes an 404 error to next function', () => {
          const req = mockRequest({}, { id: mockId });
          const res = mockResponse();
          new CarController().delete(
            req as Request<{ id: string; }>,
            res as unknown as Response,
            nextStub,
          )
            .then(() => {
              expect(nextStub.calledOnceWith({ code: c.notFound, message: m.notFound }));
            })
        })
      })
    })
  })
})
