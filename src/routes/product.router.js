import { Router } from "express";
import FileManager from "../data/clases/DBManager.js";
import path from "path";
import ProductModels from "../models/product.models.js";

const productRouter = Router();


productRouter.get("/", async (req, res) => {
  try {
    console.log(req.query.limit);
    console.log(req.query.pages);

    const limit = req.query.limit;
    const page = req.query.pages;

    const product = await ProductModels.paginate({},{limit,page,sort:{price:-1}})
     res.send(product)
    }
   catch (error){console.log(error)}
} )


/*
const productFileManager = new FileManager.ProductFileManager();

productRouter.get("/", async (req, res) => {
  try {

    console.log(req.params.limit);
    console.log(req.params.pages);

    const  options = {
      limit : parseInt(req.params.limit, 5) || 10,
      page : parseInt(req.params.pages, 2) || 1,
    }

    const products = await ProductModel.paginate( {},options);
    res.send(products);
    }
    catch (err) {
      console.log(err)}
      })

    
    const products = await productFileManager.read();
    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});*/

productRouter.post("/", async (req, res) => {
  const newProduct = {
    ...req.body,
  };

  try {
    const response = await productFileManager.create(newProduct);
    console.log(response);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProduct = req.body;

  try {
    const response = await productFileManager.update(pid, newProduct);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const response = await productFileManager.delete(pid);
    res.send({
      message: "Producto eliminado",
      id: pid,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default productRouter;