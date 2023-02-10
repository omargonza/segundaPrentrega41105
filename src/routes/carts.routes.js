import { Router } from "express";
import { v4 } from "uuid";
import FileManager from "../data/clases/DBManager.js";
import cartModel from "../models/cart.model.js";



const cartRouter = Router();


cartRouter.get("/", async (req, res) => {
  try {
    const cart = await cartModel.getCart();
    res.send(cart);
    } catch (err) {
      res.status(500).send(err.message);
      }
      });
      
cartRouter.post("/", async (req, res) => {
  try {
    const response = await cartModel.createCart([]);
    res.send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

cartRouter.get("/", async (req, res) => {
  try {
    const cart = await cartModel.read();
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const response = await cartModel.create([]);
    console.log(response);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const {cid} = req.params;
  const { pid } = req.params;
  const {quantitfy} = req.body;

  try {
    const response = await cartModel.addProductTocart(cid,pid,quantitfy);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const {cid} = req.params;

  try {
    const response = await cartModel.removeProductFromCart(pid, cid);
    res.send({
      
      message: "Producto eliminado exitosamente",
      id: pid,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default cartRouter;