import passport from "passport";
import usersController from "../controllers/users.controller.js";
import BaseRouter from "./router.js";

export default class SessionsRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      passport.authenticate("register", { failureRedirect: "/failregister" }),
      usersController.registerUser
    );

    this.get("/failregister", ["PUBLIC"], usersController.failRegisterUser);

    this.post(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login", { failureRedirect: "/faillogin" }),
      usersController.loginUser
    );

    this.get("/faillogin", ["PUBLIC"], usersController.failLoginUser);

    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      usersController.github
    );

    this.get(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      usersController.githubCallback
    );

    this.get("/current", ["PUBLIC"], usersController.getUser);

    this.get("/:email", ["PUBLIC"], usersController.getUserByEmail);

    this.put("/:email", ["PUBLIC"], usersController.putUserByEmail);
  }
}
