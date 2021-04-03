export default (mongoose) => {
  const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cell: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  }
});

const users = mongoose.model('users', schema, 'users');
return users;
};
