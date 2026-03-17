# 🛒 Backend E-commerce - Entrega Final

## 📌 Descripción
Backend de una aplicación e-commerce desarrollado con Node.js, Express y MongoDB Atlas. Implementa arquitectura MVC, persistencia en base de datos, gestión de productos y carritos, y vistas con Handlebars.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.io
- Nodemon
- Dotenv


---


## ⚙️ Instalación

1. Clonar el repositorio:

  git clone <https://github.com/eduhartkopf/backend_I_entrega_final_Hartkopf.git>

2. Instalación de dependencias:

  npm install 

3. Crear .env

  MONGO_URI=mongodb+srv://eduhartkopf:hartkopf@backendunofinalhartkopf.fsieetz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=BackendUnoFinalHartkopf
  
  PORT=8080

4. Ejecutar servidor:

  npm run dev

---

## Endpoints

  - GET /api/products → listado con paginación, filtros y orden

  - GET /api/products/:pid → producto por ID

  - POST /api/products → crear producto

  - PUT /api/products/:pid → actualizar producto

  - DELETE /api/products/:pid → eliminar producto


## Carritos

  - POST /api/carts → crear carrito

  - GET /api/carts/:cid → obtener carrito con     populate

  - POST /api/carts/:cid/products/:pid → agregar producto al carrito

  - PUT /api/carts/:cid → reemplazar carrito

  - PUT /api/carts/:cid/products/:pid → actualizar cantidad

  - DELETE /api/carts/:cid/products/:pid → eliminar producto
  
  - DELETE /api/carts/:cid → vaciar carrito


## Vistas (Handlebars)

  - /products → listado de productos con paginación

  - /products/:pid → detalle del producto

  - /carts/:cid → visualización del carrito

## Funcionalidades destacadas

    Paginación con mongoose-paginate-v2
  
    Filtros por categoría y disponibilidad

    Ordenamiento por precio

    Populate en carrito (referencias a productos)

    Validaciones en endpoints

    Manejo de errores
    
    Arquitectura modular (MVC)


## Funcionalidades destacadas

Las credenciales se manejan mediante variables de entorno (.env) y no estan expuestas en el repositorio.

Autor:

Jorge Hartkopf – Entrega final Backend I
```
