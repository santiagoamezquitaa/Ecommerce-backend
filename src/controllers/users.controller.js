import CurrentUserDTO from "../dao/dto/currentUser.dto.js";
import { userService } from "../services/index.js";

const registerUser = async (req, res) => {
  res.send({ status: "success", message: "Usuario registrado" });
};

const failRegisterUser = async (req, res) => {
  console.log("Estrategia fallida");
  res.send({ status: "error", error: "Registro fallido" });
};

const loginUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .send({ status: "error", error: "Credenciales incorrectas" });
  }

  req.session.user = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
    cartId: req.user.cart,
  };

  res.send({
    status: "success",
    message: "Usuario registrado",
    payload: req.user,
  });
};

const failLoginUser = async (req, res) => {
  res.send({ status: "error", error: "Inicio de sesión fallido" });
};

const getUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const currentUserId = req.session.passport.user;
      const getUserResponse = await userService.getOneUser(currentUserId);
      const currentUserDTO = new CurrentUserDTO(getUserResponse);
      res.status(200).send(currentUserDTO);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const githubCallback = async (req, res) => {
  req.session.user = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
    totalPurchase: 0,
  };

  res.redirect("/products");
};

const github = async (req, res) => {};

export default {
  registerUser,
  failRegisterUser,
  loginUser,
  failLoginUser,
  github,
  githubCallback,
  getUser,
};
