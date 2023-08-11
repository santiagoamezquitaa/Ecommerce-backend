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
    id: req.user._id,
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

const postDocuments = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .send({ status: "error", error: "No se pudo guardar los documentos" });
    }

    const userId = req.params.uid;

    const postDocumentResponse = await userService.postAllDocumentsUser(
      userId,
      req.files
    );

    res
      .status(200)
      .send({ status: "success", payload: postDocumentResponse.documents });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const getAllUsersResponse = await userService.getAllUsers();
    const dtoResponse = getAllUsersResponse.map(
      (user) => new CurrentUserDTO(user)
    );

    res.status(200).send({ status: "success", payload: dtoResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const deleteManyUsers = async (req, res) => {
  try {
    const deleteUsersResponse = await userService.deleteUsers();

    res.status(200).send({ status: "success", payload: deleteUsersResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const deleteUserResponse = await userService.deleteOneUser(userId);

    res.status(200).send({ status: "success", payload: deleteUserResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const github = async (req, res) => {
  return res.status(400).send({ status: "error", error: error.message });
};

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
  postDocuments,
  getUsers,
  deleteManyUsers,
  deleteUser,
};
