import { Router } from "express";
import passport from "passport";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  usersController.registerUser
);

router.get("/failregister", usersController.failRegisterUser);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  usersController.loginUser
);

router.get("/faillogin", usersController.failLoginUser);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  usersController.github
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  usersController.githubCallback
);

router.get("/current", usersController.getUser);

export default router;
