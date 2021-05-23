export default (mongoose) => {
  const schema = mongoose.Schema({
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
    idCar: {
      type: String,
    },
    idAddress: {
      type: String,
    },
    idAdmin: {
      type: String,
    }
  });

  const order = mongoose.model('order', schema, 'order');
  return order;
};


// tipo de serviço
// tipo de combustivel
// quantidade de combustivel
// pagamento
// pagamento aprovado
// ligação com o id do cliente
// quando o motorista pegar adicionar o id admin
