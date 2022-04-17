import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createMotorcycleInput, mockId } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';
import { ErrorMessage as m } from '../../errors';

describe('10 - Endpoint DELETE /motorcycles/:id', () => {

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

    it('Outputs code 204 and no body', (done) => {
      request(server.getApp())
        .post('/motorcycles')
        .send(createMotorcycleInput)
        .expect(c.created)
        .then((createdMotorcycle) => {
          const _id = createdMotorcycle.body._id;
          request(server.getApp())
            .delete(`/motorcycles/${_id}`)
            .expect(c.noContent)
            .then((res) => {
              expect(res.body).toEqual({});
              return done();
            });
        });
      })
    })
      
  describe('❎ Failure', () => {

    it('Outputs code 400 "Id must have 24 hexadecimal characters" if id is invalid', (done) => {
      request(server.getApp())
        .delete('/motorcycles/1')
        .expect(c.badRequest)
        .then((res) => {
          expect(res.body).toEqual({ error: m.invalidId });
          return done();
        });
    })

    it('Outputs code 404 "Object not found" if id is valid but has no reference in the db', (done) => {
      request(server.getApp())
        .delete(`/motorcycles/${mockId}`)
        .expect(c.notFound)
        .then((res) => {
          expect(res.body).toEqual({ error: m.notFound });
          return done();
        });
    })
  })
});