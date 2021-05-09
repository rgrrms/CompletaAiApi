import db from '../models/index';
import dotenv from 'dotenv-safe';
dotenv.config();

const Cars = db.cars;

const createCar = async (req, res) => {
  try {
    const { license, carModel, color } = req.body;
    const car = new Cars({
      license,
      carModel,
      color,
      idUser: req.resUser._id
    });

    await car.save();
    // res.send({ message: "User and car successfully registered!" })
  } catch (e) {
    res.status(500).send({ message: "Some error occurred while creating the user!\n" + e + "\nTry again." });
  }
}

const getCar = async (req, res) => {
  try {
    console.log(req)
    console.log(req.params)
    const car = await Cars.findOne(req.params)
    res.status(200).send(car);
  }catch (e) {
    res.status(500).send({ message: "some error occurred when fetching the car!" + e });
  }
}

export default { createCar, getCar }
