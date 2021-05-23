import db from '../models/index';
import dotenv from 'dotenv-safe';
dotenv.config();

const Order = db.order;

const createOrder = async (req, res, next) => {
  try {
    const { service, fuelType, amountFuel, car, address} = req.body;
    const order = new Order({
      service,
      fuelType,//tipo de combustivel
      amountFuel,//litros
      payment: amountFuel * 5,
      paymentAccept: false,
      status: "Aguardando Pagamento",
      idUser: req.userId,
      car,
      address
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
    res.status(200).send(allOrdersByUser);
  }catch (e) {
    res.status(500).send({ message: "some error occurred while fetching the order list!" + e })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params);
    console.log(deleted);
    res.status(200).send({ message: "Order successfully deleted!" });
  } catch (e) {
    res.status(500).send({ message: "some error occurred while deleting a order!" + e })
  }
}

const updateStatusOrder = async (req, res) => {
  try {
    console.log(req.body)
    const updated = await Order.findByIdAndUpdate(req.params, req.body);
    console.log(updated);
    res.status(200).send({ message: "Order successfully updated!" });
  } catch (e) {
    res.status(500).send({ message: "some error occurred while updating a order!" + e })
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

export default { createOrder, listAllOrders, listOrderByUser, deleteOrder, updateStatusOrder }
