import sinon from 'sinon';
import mongoose from 'mongoose';

type MockResponse = {
  status(): any;
  json(): any;
}

export const nextStub = sinon.stub();

export const mockRequest = (body?: any, params?: { id?: string }) => ({ body, params });

export const mockResponse = () => {
  const res: MockResponse = { status: () => {}, json: () => {} };
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

export const mockId = '4edd40c86762e0fb12000003';

export const createCarInput = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 5,
}

export const createCarOutput = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 5,
  "_id": mockId,
}

export const readCarsOutput = [
  {
    "model": "Fusca",
    "year": 1986,
    "color": "Magenta",
    "buyValue": 10000,
    "doorsQty": 2,
    "seatsQty": 4,
    "_id": mockId,
  }
]

export const readOneCarOutput = {
  "model": "Fusca",
  "year": 1986,
  "color": "Magenta",
  "buyValue": 10000,
  "doorsQty": 2,
  "seatsQty": 4,
  "_id": mockId,
}

export const updateCarInput = {
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4,
}

export const updateCarOutput = {
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4,
  _id: mockId,
}

export const deleteCarOutput = {
  model: "Opala",
  year: 1982,
  color: "Black",
  buyValue: 8000,
  seatsQty: 5,
  doorsQty: 4,
  _id: mockId,
}

export const createMotorcycleInput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const createMotorcycleOutput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
  "_id": mockId,
}

export const readMotorcyclesOutput = [
  {
    "model": "Dream",
    "year": 2020,
    "color": "Black",
    "buyValue": 4000,
    "category": 'Trail',
    "engineCapacity": 500,
    "_id": mockId,
  }
]

export const readOneMotorcycleOutput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
  "_id": mockId,
}

export const updateMotorcycleInput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const updateMotorcycleOutput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
  _id: mockId,
}

export const deleteMotorcycleOutput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
  _id: mockId,
}

export default {}