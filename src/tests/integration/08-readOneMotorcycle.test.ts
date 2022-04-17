import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createMotorcycleInput, mockId } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';
import { ErrorMessage as m } from '../../errors';

describe('08 - Endpoint GET /motorcycles/:id', () => {

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

    it('Outputs code 200 and a specific motorcycle', (done) => {
      request(server.getApp())
        .post('/motorcycles')
        .send(createMotorcycleInput)
        .expect(c.created)
        .then((createdMotorcycle) => {
          request(server.getApp())
            .get(`/motorcycles/${createdMotorcycle.body._id}`)
            .expect(c.ok)
            .then((res) => {
              expect(res.body).toEqual(createdMotorcycle.body);
              return done();
            });
        });
    })
  })
    
  describe('❎ Failure', () => {

    it('Outputs code 400 "Id must have 24 hexadecimal characters" if id is invalid', (done) => {
      request(server.getApp())
        .get('/motorcycles/1')
        .expect(c.badRequest)
        .then((res) => {
          expect(res.body).toEqual({ error: m.invalidId });
          return done();
        });
    })

    it('Outputs code 404 "Object not found" if id is valid but has no reference in the db', (done) => {
      request(server.getApp())
        .get(`/motorcycles/${mockId}`)
        .expect(c.notFound)
        .then((res) => {
          expect(res.body).toEqual({ error: m.notFound });
          return done();
        });
    })
  })
});