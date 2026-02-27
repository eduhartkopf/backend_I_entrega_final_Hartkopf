import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// HOME
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log("Productos en HOME:", products);
    res.render("home", { products });
  } catch (error) {
    console.error("Error cargando productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// REAL TIME PRODUCTS
router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error cargando productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;