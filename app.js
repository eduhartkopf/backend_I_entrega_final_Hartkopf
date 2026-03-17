import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
import Product from "./src/models/product.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// conexión a Mongo
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

// handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
  }),
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// servidor HTTP para socket.io
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// sockets con Mongo
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  try {
    const products = await Product.find().lean();
    socket.emit("products", products);
  } catch (error) {
    console.error("Error al cargar productos por socket:", error.message);
  }

  socket.on("createProduct", async (product) => {
    try {
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
      } = product;

      if (
        !title ||
        !description ||
        !code ||
        price === undefined ||
        stock === undefined ||
        !category
      ) {
        socket.emit("productError", "Faltan campos obligatorios");
        return;
      }

      const existingProduct = await Product.findOne({ code });
      if (existingProduct) {
        socket.emit("productError", "Ya existe un producto con ese code");
        return;
      }

      await Product.create({
        title,
        description,
        code,
        price: Number(price),
        stock: Number(stock),
        category,
        thumbnails: thumbnails || [],
        status: status !== undefined ? status : true,
      });

      const updatedProducts = await Product.find().lean();
      io.emit("products", updatedProducts);
    } catch (error) {
      console.error("Error al crear producto por socket:", error.message);
      socket.emit("productError", "Error al crear producto");
    }
  });

  socket.on("deleteProduct", async (id) => {
    try {
      await Product.findByIdAndDelete(id);

      const updatedProducts = await Product.find().lean();
      io.emit("products", updatedProducts);
    } catch (error) {
      console.error("Error al eliminar producto por socket:", error.message);
      socket.emit("productError", "Error al eliminar producto");
    }
  });
});

// levantar servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
