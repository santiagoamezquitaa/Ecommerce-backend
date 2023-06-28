import { Router } from "express";
import { UserManager } from "../dao/dataBaseManager/userManager.js";

const router = Router();

const userManager = new UserManager();

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const addUserResponse = await userManager.addUser(user);
    return res
      .status(200)
      .send({ status: "success", message: addUserResponse[0] });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const validateUserResponse = await userManager.createSession(user);
    req.session.user = {
      name: `${validateUserResponse.firstName} ${validateUserResponse.lastName}`,
      email: validateUserResponse.email,
      age: validateUserResponse.age,
    };
    if (req.session.user.email === "adminCoder@coder.com") {
      req.session.user.role = "admin";
    } else {
      req.session.user.role = "user";
    }
    res.status(200).send({ status: "success", message: validateUserResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

export default router;
