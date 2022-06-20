import request from 'supertest';

import connection from '../../db/connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../api/server';

import { createCarInput, mockId, updateCarInput } from './utils/mocks';

import { StatusCodes as c } from '../../app/helpers/interfaces';
import { ErrorMessage as m } from '../../app/helpers/errors';

describe('04 - Endpoint PUT /cars/:id', () => {

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

    it('Outputs code 200 and the updated car', (done) => {
      request(server.getApp())
        .post('/cars')
        .send(createCarInput)
        .expect(c.created)
        .then((createdCar) => {
          const _id = createdCar.body._id;
          request(server.getApp())
            .put(`/cars/${_id}`)
            .send(updateCarInput)
            .expect(c.ok)
            .then((res) => {
              expect(res.body).toHaveProperty('_id');
              expect(res.body._id).toEqual(_id);

              expect(res.body).toHaveProperty('buyValue');
              expect(res.body.buyValue).toEqual(createCarInput.buyValue);

              expect(res.body).toHaveProperty('color');
              expect(res.body.color).toEqual(createCarInput.color);

              expect(res.body).toHaveProperty('doorsQty');
              expect(res.body.doorsQty).toEqual(createCarInput.doorsQty);

              expect(res.body).toHaveProperty('model');
              expect(res.body.model).toEqual(createCarInput.model);

              expect(res.body).toHaveProperty('seatsQty');
              expect(res.body.seatsQty).toEqual(createCarInput.seatsQty);

              expect(res.body).toHaveProperty('year');
              expect(res.body.year).toEqual(createCarInput.year);

              return done();
            });
        });
    })
  })

  describe('❎ Failure', () => {

    it('Outputs code 400 "Id must have 24 hexadecimal characters" if id is invalid', (done) => {
      request(server.getApp())
        .put('/cars/1')
        .send(updateCarInput)
        .expect(c.badRequest)
        .then((res) => {
          expect(res.body).toEqual({ error: m.invalidId });
          return done();
        });
    })

    it('Outputs code 400 if body is incomplete', (done) => {
      request(server.getApp())
        .put(`/cars/${mockId}`)
        .expect(c.badRequest, done);
    })

    it('Outputs code 404 "Object not found" if id is valid but has no reference in the db', (done) => {
      request(server.getApp())
        .put(`/cars/${mockId}`)
        .send(updateCarInput)
        .expect(c.notFound)
        .then((res) => {
          expect(res.body).toEqual({ error: m.notFound });
          return done();
        });
    })
  })
});