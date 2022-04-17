import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createMotorcycleInput } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';

describe('07 - Endpoint GET /motorcycles', () => {

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

    it('Outputs code 200 and an array of motorcycles', (done) => {
      request(server.getApp())
        .post('/motorcycles')
        .send(createMotorcycleInput)
        .expect(c.created)
        .then((createdMotorcycle) => {
          request(server.getApp())
            .get('/motorcycles')
            .expect(c.ok)
            .then((res) => {
              expect(res.body).toEqual([createdMotorcycle.body]);
              return done();
            });
        });
    })

    it('Outputs code 200 and an empty array if there are no motorcycles in the db', (done) => {
      request(server.getApp())
        .get('/motorcycles')
        .expect(c.ok)
        .then((res) => {
          expect(res.body).toEqual([]);
          return done();
        });
    })
  })
});