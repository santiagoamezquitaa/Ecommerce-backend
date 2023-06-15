import express from "express";
import productsRoutes from "./routes/products.router.js";
import cartsRoutes from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(8080, () => {
  console.log("Servidor arriba en el puerto 8080!");
});
