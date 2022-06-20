import request from 'supertest';

import connection from '../../db/connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../api/server';

import { createCarInput } from './utils/mocks';

import { StatusCodes as c } from '../../app/helpers/interfaces';

describe('02 - Endpoint GET /cars', () => {

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

    it('Outputs code 200 and an array of cars', (done) => {
      request(server.getApp())
        .post('/cars')
        .send(createCarInput)
        .expect(c.created)
        .then((createdCar) => {
          request(server.getApp())
            .get('/cars')
            .expect(c.ok)
            .then((res) => {
              expect(res.body).toEqual([createdCar.body]);
              return done();
            })
        });
    })

    it('Outputs code 200 and an empty array if there are no cars in the db', (done) => {
      request(server.getApp())
        .get('/cars')
        .expect(c.ok)
        .then((res) => {
          expect(res.body).toEqual([]);
          return done();
        })
    })
  })
});