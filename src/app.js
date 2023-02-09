import express from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import productRouter from './routes/product.router.js';
import * as CONSTANTS from "./constants.js";

dotenv.config();
const PORT = process.env.PORT || 8081;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products",productRouter);



app.get('/', (req, res) => {res.send("<h1>Ecommerce</h1>");});
app.listen(PORT, () => {
  console.log(`Iniciado en http://localhost:${PORT}`);
});


mongoose.set("strictQuery",false);

mongoose.connect(
      `mongodb+srv://Gonza81:Luci@cluster0.zalvman.mongodb.net/Ecommerces?retryWrites=true&w=majority`,
  
  (error) => {
    if (error) {
      console.log("Error de conexion");
      process.exit();
    } else {
      console.log("Conectado a la base de datos");
    }
  }
  );
  