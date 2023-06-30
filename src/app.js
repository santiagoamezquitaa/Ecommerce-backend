import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import __dirname from "./utils.js";
import productsRoutes from "./routes/products.router.js";
import cartsRoutes from "./routes/carts.router.js";
import viewsRoutes from "./routes/views.router.js";
import messagesRoutes from "./routes/chat.router.js";
import sessionsRoutes from "./routes/sessions.router.js";
import { Server } from "socket.io";

const mongoURL =
  "mongodb+srv://santiagoamezquita:JhwQFvIvxMeKcIvr@clusterecommerce.0pndgq2.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Servidor arriba en el puerto 8080!");
});
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.use("/api/messages", messagesRoutes);

app.use(express.static(__dirname + "/public"));

mongoose.connect(mongoURL);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoURL,
      ttl: 3600,
    }),
    secret: "coder secret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/sessions", sessionsRoutes);
app.use("/", viewsRoutes);

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
