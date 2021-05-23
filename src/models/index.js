import mongoose from 'mongoose';
import usersModel from "./usersModel";
import adminModel from "./adminModel";
import carsModel from "./carsModel";
import addressModel from "./addressModel";
import dotenv from 'dotenv-safe';
import orderModel from "./orderModel";
import infosModel from "./infosModel";
dotenv.config()

const db = {};

db.url = process.env.DB_URL;
db.mongoose = mongoose;
db.admin = adminModel(mongoose);
db.users = usersModel(mongoose);
// db.cars = carsModel(mongoose);
// db.address = addressModel(mongoose);
// db.order = orderModel(mongoose);

db.cars = infosModel.cars;
db.address = infosModel.address;
db.order = infosModel.order;

export default db;
