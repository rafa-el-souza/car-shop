export const mockId = '4edd40c86762e0fb12000003';

// Car

export const createCarInput = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const updateCarInput = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const updateCarOutput = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const carNoModel = {
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carNoYear = {
  "model": "Brasília",
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carNoColor = {
  "model": "Brasília",
  "year": 1972,
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carNoBuyValue = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carNoDoorsQty = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "seatsQty": 8,
}

export const carNoSeatsQty = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
}

export const carWrongTypeModel = {
  "model": { model: "Brasília" },
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const carWrongTypeYear = {
  "model": "Brasília",
  "year": { year: 1972 },
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const carWrongTypeColor = {
  "model": "Brasília",
  "year": 1972,
  "color": { color: "Ciano" },
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 4,
}

export const carWrongTypeBuyValue = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": { buyValue: 4000 },
  "doorsQty": 2,
  "seatsQty": 4,
}

export const carWrongTypeDoorsQty = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": { doorsQty: 2 },
  "seatsQty": 4,
}

export const carWrongTypeSeatsQty = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": { seatsQty: 4 },
}

export const carLessThanTwoSeats = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 0,
}

export const carMoreThanSevenSeats = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carLessThanTwoDoors = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const carMoreThanFourDoors = {
  "model": "Brasília",
  "year": 1972,
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

// Motorcycle

export const createMotorcycleInput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const readMotorcyclesOutput = [
  {
    "model": "Dream",
    "year": 2020,
    "color": "Black",
    "buyValue": 4000,
    "category": 'Trail',
    "engineCapacity": 500,
  }
]

export const readOneMotorcycleOutput = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
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
}

export const motorcycleInvalidCategory = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": '',
  "engineCapacity": 500,
}

export const motorcycleMoreThanMaximumEngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 5000,
}

export const motorcycleNegativeEngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": -1000,
}

export const motorcycleNotIntegerEngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 1000.1,
}

export const motorcycleLessThan50EngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 0,
}

export const motorcycleNoModel = {
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleNoYear = {
  "model": "Brasília",
  "color": "Ciano",
  "buyValue": 4000,
  "doorsQty": 2,
  "seatsQty": 8,
}

export const motorcycleNoColor = {
  "model": "Dream",
  "year": 2020,
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleNoBuyValue = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleNoCategory = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "engineCapacity": 500,
}

export const motorcycleNoEngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
}

export const motorcycleWrongTypeModel = {
  "model": { model: "Dream" },
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleWrongTypeYear = {
  "model": "Dream",
  "year": { year: 2020 },
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleWrongTypeColor = {
  "model": "Dream",
  "year": 2020,
  "color": { color: "Black" },
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleWrongTypeBuyValue = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": { buyValue: 4000 },
  "category": 'Trail',
  "engineCapacity": 500,
}

export const motorcycleWrongTypeCategory = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": { category: 'Trail' },
  "engineCapacity": 500,
}

export const motorcycleWrongTypeEngineCapacity = {
  "model": "Dream",
  "year": 2020,
  "color": "Black",
  "buyValue": 4000,
  "category": 'Trail',
  "engineCapacity": { engineCapacity: 500 },
}

