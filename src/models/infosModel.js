import mongoose from 'mongoose';

const Address = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  complement: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true
  }
});

const Car = new mongoose.Schema({
  license: {
    type: String,
    required: true
  },
  carModel: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Order = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  amountFuel: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  paymentAccept: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  car: Car,
  address: Address,
  idAdmin: {
    type: String,
  }
});

const address = mongoose.model('address', Address, 'address');
const cars = mongoose.model('cars', Car, 'cars');
const order = mongoose.model('order', Order, 'order');

export default { address, cars, order};
