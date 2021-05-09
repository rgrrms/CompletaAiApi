import db from '../models/index';
import dotenv from 'dotenv-safe';
dotenv.config();

const Order = db.order;
const Car = db.cars;
const Address = db.address;

const createOrder = async (req, res, next) => {
  try {
    const { service, fuelType, amountFuel, idCar} = req.body;
    const order = new Order({
      service,
      fuelType,//tipo de combustivel
      amountFuel,//litros
      payment: amountFuel * 5,
      paymentAccept: false,
      status: "Aguardando Pagamento",
      idUser: req.userId,
      idCar
    });

    await order.save();
    res.send({ message: "Order created successfully!" })
  } catch (e) {
    res.status(500).send({ message: "Some error occurred while creating the order!\n" + e + "\nTry again." });
  }
}

const listOrderByUser = async (req, res) => {
  try {
    console.log(req.userId);
    const allOrdersByUser = await Order.find({idUser: req.userId});
    console.log(allOrdersByUser);
    const car = await Car.find({idUser: req.userId});
    const address = await Address.find({idUser: req.userId});
    res.status(200).send({servicos: allOrdersByUser, carros: car, enderecos: address});
  }catch (e) {
    res.status(500).send({ message: "some error occurred while fetching the order list!" + e })
  }
}

const listAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).send(allOrders);
  }catch (e) {
    res.status(500).send({ message: "some error occurred while fetching the order list!" + e })
  }
}

export default { createOrder, listAllOrders, listOrderByUser }
