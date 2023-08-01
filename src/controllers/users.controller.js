import CurrentUserDTO from "../dao/dto/currentUser.dto.js";
import { userService } from "../services/index.js";
import { logger } from "../utils.loggers/logger.js";

const registerUser = async (req, res) => {
  res.send({ status: "success", message: "Usuario registrado" });
};

const failRegisterUser = async (req, res) => {
  logger.fatal("Estrategia fallida");
  res.status(400).send({ status: "error", error: req.query.error });
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

const putUserByEmail = async (req, res) => {
  try {
    const emailUser = req.params.email;
    const newPassword = req.body;
    const putUserEmailResponse = await userService.putOneUserByEmail(
      emailUser,
      newPassword
    );
    res.status(200).send({ status: "success", payload: putUserEmailResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const emailUser = req.params.email;
    const getUserEmailResponse = await userService.getOneUserByEmail(emailUser);
    res.status(200).send({ status: "success", payload: getUserEmailResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const putUsersRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    const putUsersRoleResponse = await userService.putOneUserRole(userId);
    res.status(200).send({ status: "success", payload: putUsersRoleResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
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
  putUserByEmail,
  getUserByEmail,
  putUsersRole,
};
