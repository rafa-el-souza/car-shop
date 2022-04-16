import sinon from 'sinon';
import { Motorcycle } from '../../../interfaces';

type MockResponse = {
  status(): sinon.SinonStub | null;
  json(): sinon.SinonStub | null;
}

export const mockRequest = (body?: unknown, params?: { id: string }) => ({ body, params });

export const mockResponse = () => {
  const res: MockResponse = { status: () => null, json: () => null };
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