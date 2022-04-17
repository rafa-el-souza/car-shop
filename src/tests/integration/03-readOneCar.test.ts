import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createCarInput, mockId } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';
import { ErrorMessage as m } from '../../errors';

describe('03 - Endpoint GET /cars/:id', () => {

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

    it('Outputs code 200 and a specific car', (done) => {
      request(server.getApp())
        .post('/cars')
        .send(createCarInput)
        .expect(c.created)
        .then((createdCar) => {
          request(server.getApp())
            .get(`/cars/${createdCar.body._id}`)
            .expect(c.ok)
            .then((res) => {
              expect(res.body).toEqual(createdCar.body);
              return done();
            })
      });
    })
  })
  
  describe('❎ Failure', () => {

    it('Outputs code 400 "Id must have 24 hexadecimal characters" if id is invalid', (done) => {
      request(server.getApp())
        .get('/cars/1')
        .expect(c.badRequest)
        .then((res) => {
          expect(res.body).toEqual({ error: m.invalidId });
          return done();
        });
    })

    it('Outputs code 404 "Object not found" if id is valid but has no reference in the db', (done) => {
      request(server.getApp())
        .get(`/cars/${mockId}`)
        .expect(c.notFound)
        .then((res) => {
          expect(res.body).toEqual({ error: m.notFound });
          return done();
        });
    })
  })
});