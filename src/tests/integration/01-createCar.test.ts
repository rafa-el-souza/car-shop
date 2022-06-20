import request from 'supertest';

import connection from '../../db/connection';
import { clearDatabase, closeDatabase } from './utils/db';

import server from '../../api/server';

import { carLessThanTwoDoors, carLessThanTwoSeats, carMoreThanFourDoors, carMoreThanSevenSeats, carNoBuyValue, carNoColor, carNoDoorsQty, carNoModel, carNoSeatsQty, carNoYear, createCarInput, carWrongTypeBuyValue, carWrongTypeColor, carWrongTypeDoorsQty, carWrongTypeModel, carWrongTypeSeatsQty, carWrongTypeYear } from './utils/mocks';

import { StatusCodes as c } from '../../app/helpers/interfaces';

describe('01 - Endpoint POST /cars', () => {

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

    describe('Input is OK', () => {

      it('Outputs code 201 and created car', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(createCarInput)
          .expect(c.created)
          .then((res) => {
            const { _id } = res.body;

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
      })

    })

  })

  describe('❎ Failure', () => {

    describe('Input is an empty object', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send({})
          .expect(c.badRequest, done);
      })

    })

    describe('Input has seatsQty < 2', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carLessThanTwoSeats)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has seatsQty > 7', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carMoreThanSevenSeats)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has doorsQty < 2', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carLessThanTwoDoors)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has doorsQty > 4', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carMoreThanFourDoors)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has NO "model", "year", "color", "status", "buyValue", "doorsQty" or "seatsQty" properties', () => {

      it('Outputs code c.badRequest', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carNoModel)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carNoYear)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carNoColor)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carNoBuyValue)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carNoDoorsQty)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carNoSeatsQty)
          .expect(c.badRequest, done);
      })

    })

    describe('Input has "model", "year", "color", "status", "buyValue", "doorsQty" or "seatsQty" properties with wrong types', () => {

      it('Outputs code 400', (done) => {
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeModel)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeYear)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeColor)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeBuyValue)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeDoorsQty)
          .expect(c.badRequest, done);
        request(server.getApp())
          .post('/cars')
          .send(carWrongTypeSeatsQty)
          .expect(c.badRequest, done);
      })

    })

  })

});