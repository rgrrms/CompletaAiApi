import db from '../models/index';
import dotenv from 'dotenv-safe';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

const Admin = db.admin;

const createUserAdmin = async (req, res) => {
  try {
    const { name, pass, cpf, email, cell, birthDate, permission } = req.body;
    const validateUser = await Admin.findOne({ email });
    if (validateUser) {
      res.status(404).send({ message: "A user with that email already exists! " });
    } else {
      const user = new Admin({
        name,
        pass: encryptPass(pass),
        cpf,
        email,
        cell,
        birthDate,
        permission
      })

      await user.save();
      res.send({ message: "User created successfully!" })
    }
  } catch (e) {
    res.status(500).send({ message: "Some error occurred while creating the user!\n" + e + "\nTry again." });
  }
}

const loginAdmin = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const userAdmin = await Admin.findOne({ email });
    if (userAdmin) {
      if (bcrypt.compareSync(pass, userAdmin.pass)) {
        const emailToken = userAdmin.email;
        const permissionToken = userAdmin.permission;
        const token = jwt.sign({ emailToken, permissionToken }, process.env.SECRET_ADMIN_TOKEN, { expiresIn: 3600 });
        return res.json({ auth: true, token: 'Bearer ' + token });
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

const logout = async (req, res) => {
  res.json({ auth: false, token: null });
};

function encryptPass(pass) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ADMIN));
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

const verifyJWTAdmin = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token);
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided' });
  if (token.split(' ', 1) !== 'Bearer') return res.status(401).json({ auth: false, message: 'Invalid token' });

  jwt.verify(token, process.env.SECRET_ADMIN_TOKEN, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.adminEmail = decoded.emailToken;
    req.adminPermission = decoded.permissionToken;
    next();
  });
};

export default { createUserAdmin, loginAdmin, logout, verifyJWTAdmin };
