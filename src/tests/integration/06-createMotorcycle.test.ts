import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createMotorcycleInput, motorcycleInvalidCategory, motorcycleMoreThanMaximumEngineCapacity, motorcycleNegativeEngineCapacity, motorcycleNotIntegerEngineCapacity, motorcycleLessThan50EngineCapacity, motorcycleNoModel, motorcycleNoYear, motorcycleNoColor, motorcycleNoBuyValue, motorcycleNoCategory, motorcycleNoEngineCapacity, motorcycleWrongTypeModel, motorcycleWrongTypeYear, motorcycleWrongTypeColor, motorcycleWrongTypeBuyValue, motorcycleWrongTypeCategory, motorcycleWrongTypeEngineCapacity } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';

describe('06 - Endpoint POST /motorcycles', () => {

  beforeAll(async () => {
    await connection();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('✅ Success', () => {

    describe('Input is complete', () => {

      it('Outputs code 201 and created motorcycle', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(createMotorcycleInput)
          .expect(c.created)
          .then((res) => {
            const { _id } = res.body;

            expect(res.body).toHaveProperty('_id');
            expect(res.body._id).toEqual(_id);

            expect(res.body).toHaveProperty('buyValue');
            expect(res.body.buyValue).toEqual(createMotorcycleInput.buyValue);

            expect(res.body).toHaveProperty('color');
            expect(res.body.color).toEqual(createMotorcycleInput.color);

            expect(res.body).toHaveProperty('category');
            expect(res.body.category).toEqual(createMotorcycleInput.category);

            expect(res.body).toHaveProperty('model');
            expect(res.body.model).toEqual(createMotorcycleInput.model);

            expect(res.body).toHaveProperty('engineCapacity');
            expect(res.body.engineCapacity).toEqual(createMotorcycleInput.engineCapacity);

            expect(res.body).toHaveProperty('year');
            expect(res.body.year).toEqual(createMotorcycleInput.year);

            return done();
          });
      })

    })

  })

  describe('❎ Failure', () => {

    describe('Input is an empty object', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send({})
          .expect(c.badRequest, done);
      })

    })

    describe('Input has invalid category', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleInvalidCategory)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has engineCapacity > 2500', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleMoreThanMaximumEngineCapacity)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has negative engineCapacity', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNegativeEngineCapacity)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has non integer engineCapacity', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNotIntegerEngineCapacity)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has engineCapacity < 50', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleLessThan50EngineCapacity)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has NO "model", "year", "color", "status", "buyValue", "category" or "engineCapacity" properties', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoModel)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoYear)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoColor)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoBuyValue)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoCategory)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleNoEngineCapacity)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has "model", "year", "color", "status", "buyValue", "category" or "engineCapacity" properties with wrong types', () => {

      it('Outputs code 400', (done) => {
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeModel)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeYear)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeColor)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeBuyValue)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeCategory)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/motorcycles')
          .send(motorcycleWrongTypeEngineCapacity)
          .expect(c.badRequest, done);
      })

    })

  })

});