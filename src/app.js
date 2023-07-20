import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";

import __dirname from "./utils.js";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import errorHandler from "./middlewares/errors/index.js";

const app = express();
const httpServer = app.listen(config.port, () => {
  console.log(`Servidor arriba en el puerto ${config.port}!`);
});
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect(config.mongoUrl);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      ttl: config.sessionTtl,
    }),
    secret: "coder secret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
app.use(errorHandler);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("message", async (data) => {
    await fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let messagesLogs = await fetch("http://localhost:8080/api/messages", {
      method: "GET",
    });
    socketServer.emit("messagesLogs", await messagesLogs.json());
  });
});

export default socketServer;
