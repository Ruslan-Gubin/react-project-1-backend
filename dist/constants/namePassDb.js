import * as dotenv from 'dotenv';
dotenv.config();
const MONGO_NAME = process.env['MONGO_URL_PRODUCTS_NAME'];
const MONGO_PASSWORLD = process.env['MONGO_URL_PRODUCTS_PASSWORLD'];
const MONGO_NAME_DB_PRODUCTS = process.env['MONGO_URL_PRODUCTS_NAME_BASE'];
const MONGO_DB_PRODUCTS = `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORLD}@cluster0.odh79.mongodb.net/${MONGO_NAME_DB_PRODUCTS}?retryWrites=true&w=majority`;
export { MONGO_DB_PRODUCTS, };
