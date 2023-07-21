import passport from "passport";
import local from "passport-local";
import { createhash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.model.js";
import config from "./config.js";
import { logger } from "../utils.loggers/logger.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { firstName, lastName, email, age, cart } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            logger.error("El usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            firstName,
            lastName,
            email,
            age,
            password: createhash(password),
            cart,
          };

          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("Error al obtener al usuario: " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            logger.error("El usuario no existe");
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.gitHubClientId,
        clientSecret: config.githubClientSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              firstName: profile._json.name,
              lastName: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };
            let result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
