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
  };

  if (req.session.user.email === "adminCoder@coder.com") {
    req.session.user.role = "admin";
  } else {
    req.session.user.role = "user";
  }

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
      res.status(200).send(getUserResponse);
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
  };

  if (req.session.user.email === "adminCoder@coder.com") {
    req.session.user.role = "admin";
  } else {
    req.session.user.role = "user";
  }

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
