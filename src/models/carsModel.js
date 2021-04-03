export default (mongoose) => {
  const schema = mongoose.Schema({
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

  const cars = mongoose.model('cars', schema, 'cars');
  return cars;
};
