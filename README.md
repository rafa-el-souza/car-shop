# Car Shop API

A RESTful API for a vehicle shop. Developed during Trybe's backend module.

## Features

* Node.js
   * Express.js
* MongoDB
   * Mongoose
* OOP paradigm
* S.O.L.I.D. principles
* Integration tests
* 100% coverage unit tests

## Prerequisites

You will need the following installed on your computer.

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [MongoDB](https://www.mongodb.com/docs/guides/server/install/)

## Install it locally

1. Clone repository

   ```sh
   git clone https://github.com/rafa-el-souza/car-shop.git
   ```

2. Enter repo's folder

   ```sh
   cd car-shop
   ```

3. Install dependencies

   ```sh
   npm install
   ```

## Usage

### Initialize MongoDB

   ```sh
   sudo service mongodb start
   ```

### Initialize the API

   ```sh
   npm start
   ```

## Tests

* ### Unit tests

   ```sh
   npm run test:unit
   ```

* ### Coverage of unit tests

   ```sh
   npm run test:unit:coverage
   ```

* ### Integration tests

   ```sh
   npm run test:integration
   ```

## Todo

- [x] Add documentation
- [x] Add integration tests
- [x] 100% coverage unit tests
- [x] Add swagger docs
- [ ] Add Docker
- [ ] Deploy
