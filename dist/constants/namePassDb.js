import * as dotenv from 'dotenv';
dotenv.config();
var MONGO_NAME = process.env['MONGO_URL_PRODUCTS_NAME'];
var MONGO_PASSWORLD = process.env['MONGO_URL_PRODUCTS_PASSWORLD'];
var MONGO_NAME_DB_PRODUCTS = process.env['MONGO_URL_PRODUCTS_NAME_BASE'];
var MONGO_DB_PRODUCTS = "mongodb+srv://".concat(MONGO_NAME, ":").concat(MONGO_PASSWORLD, "@cluster0.odh79.mongodb.net/").concat(MONGO_NAME_DB_PRODUCTS, "?retryWrites=true&w=majority");
export { MONGO_DB_PRODUCTS, };
