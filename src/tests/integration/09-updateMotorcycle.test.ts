import request from 'supertest';

import connection from '../../connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../server';

import { createMotorcycleInput, mockId, updateMotorcycleInput } from './utils/mocks';

import { StatusCodes as c } from '../../interfaces';
import { ErrorMessage as m } from '../../errors';

describe('09 - Endpoint PUT /motorcycles/:id', () => {

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

    it('Outputs code 200 and the updated motorcycle', (done) => {
      request(server.getApp())
        .post('/motorcycles')
        .send(createMotorcycleInput)
        .expect(c.created)
        .then((createdMotorcycle) => {
          const _id = createdMotorcycle.body._id;
          request(server.getApp())
            .put(`/motorcycles/${_id}`)
            .send(updateMotorcycleInput)
            .expect(c.ok)
            .then((res) => {
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
        });
    })

    describe('❎ Failure', () => {

      it('Outputs code 400 "Id must have 24 hexadecimal characters" if id is invalid', (done) => {
        request(server.getApp())
          .put('/motorcycles/1')
          .send(updateMotorcycleInput)
          .expect(c.badRequest)
          .then((res) => {
            expect(res.body).toEqual({ error: m.invalidId });
            return done();
          });
        })
      })

      it('Outputs code 400 if body is incomplete', (done) => {
        request(server.getApp())
          .put(`/motorcycles/${mockId}`)
          .expect(c.badRequest, done);
      })

      it('Outputs code 404 "Object not found" if id is valid but has no reference in the db', (done) => {
        request(server.getApp())
          .put(`/motorcycles/${mockId}`)
          .send(updateMotorcycleInput)
          .expect(c.notFound)
          .then((res) => {
            expect(res.body).toEqual({ error: m.notFound });
            return done();
          });
      })
    })
});