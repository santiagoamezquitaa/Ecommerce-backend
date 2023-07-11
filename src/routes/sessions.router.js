import { Router } from "express";
import { UserManager } from "../dao/dataBaseManager/userManager.js";
import passport from "passport";

const router = Router();

const userManager = new UserManager();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" });
  }
);

router.get("/failregister", async (req, res) => {
  console.log("Estrategia fallida");
  res.send({ status: "error", error: "Registro fallido" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
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
  }
);

router.get("/faillogin", async (req, res) => {
  res.send({ status: "error", error: "Inicio de sesión fallido" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
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
  }
);

router.get("/current", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const currentUserId = req.session.passport.user;
      const getUserResponse = await userManager.getUser(currentUserId);
      res.status(200).send(getUserResponse);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
