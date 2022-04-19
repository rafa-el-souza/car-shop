import mongoose from 'mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';

const connection = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connection;
