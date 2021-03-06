import db from '../models/index';
import dotenv from 'dotenv-safe';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

const Users = db.users;

const createUser = async (req, res, next) => {
  try {
    const { name, pass, cpf, email, cell, birthDate } = req.body;
    const validateUser = await Users.findOne({ email });
    if (validateUser) {
      res.status(404).send({ message: "A user with that email already exists! " });
    } else {
      const user = new Users({
        name,
        pass: encryptPass(pass),
        cpf,
        email,
        cell,
        birthDate
      })

      req.resUser = await user.save();
      next();
      const getToken = await createToken(user);
      return res.json({ auth: true, token: 'Bearer ' + getToken, userId: user._id });
      // res.send({ message: "User created successfully!" })
    }
  } catch (e) {
    res.status(500).send({ message: "Some error occurred while creating the user!\n" + e + "\nTry again." });
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleted = await Users.findByIdAndDelete(req.params);
    console.log(deleted);
    res.status(200).send({ message: "User " + deleted.name + " successfully deleted!" });
  } catch (e) {
    res.status(500).send({ message: "some error occurred while deleting a customer!" + e })
  }
}

const listAllUsers = async (req, res) => {
  try {
    let allUsers = await Users.find().select('_id name  cpf  email cell');
    res.status(200).send(allUsers);
  }catch (e) {
    res.status(500).send({ message: "some error occurred while fetching the customer list!" + e })
  }
}

const login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(pass, user.pass)) {
        const getToken = await createToken(user);
        return res.json({ auth: true, token: 'Bearer ' + getToken, userId: user._id });
      } else {
        res.status(401).send({ message: "Incorrect password!" });
      }
    } else {
      res.status(401).send({ message: "Invalid login!" });
    }
  } catch (e) {
    res.status(500).send({ message: "Error signing in! " + e });
  }
}

const createToken = async (user) => {
  const emailToken = user.email;
  const idUserToken = user._id;
  const token = jwt.sign({ emailToken, idUserToken }, process.env.SECRET_TOKEN, { expiresIn: 3600 });
  return token;
}

const logout = async (req, res) => {
  res.json({ auth: false, token: null });
};

function encryptPass(pass) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

const verifyJWT = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token);
  console.log(token.split(' ', 1).toString());
  if (!token) return res.status(401).json({auth: false, message: 'No token provided'});
  if (token.split(' ', 1).toString() !== 'Bearer') return res.status(401).json({ auth: false, message: 'Invalid token' });

  jwt.verify(token.split(' ')[1], process.env.SECRET_TOKEN, function(err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' + err });

    // se tudo estiver ok, salva no request para uso posterior
    req.userEmail = decoded.emailToken;
    req.userId = decoded.idUserToken;
    next();
  });
};

export default { createUser, listAllUsers, login, logout, verifyJWT, deleteUser };
