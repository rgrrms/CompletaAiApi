import db from '../models/index';
import dotenv from 'dotenv-safe';
dotenv.config();

const Address = db.address;

const createAddress = async (req, res, next) => {
  try {
    const { state, city, street, number, complement, zipCode } = req.body;
    const address = new Address({
      state,
      city,
      street,
      number,
      complement,
      zipCode,
      idUser: req.userId
    });

    address.save();
    next();
  } catch (e) {
    res.status(500).send({ message: "Some error occurred while creating the address! \n" + e + "\n Try again." });
  }
}

export default { createAddress }



