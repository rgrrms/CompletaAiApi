export default (mongoose) => {
  const schema = mongoose.Schema({
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
    },
    idUser: {
      type: String,
      required: true
    }
  });

  const address = mongoose.model('address', schema, 'address');
  return address;
};
