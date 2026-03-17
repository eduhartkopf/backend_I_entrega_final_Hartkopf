import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // GET - leer todos los productos
  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // GET BY ID - obtener un producto puntual por ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  // POST - agregar producto y los compara.
  async addProduct(product) {
    const products = await this.getProducts();

    const exists = products.some((p) => p.code === product.code);
    if (exists) {
      return null;
    }
    // creamos un producto y hacemos que el ID se incremente en 1.
    const newProduct = {
      id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
      ...product,
    };

    // sumamos el producto a la lista de productos.
    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  // PUT - actualizar producto (sin modificar ID)
  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    products[index] = {
      ...products[index],
      ...updatedFields,
      id, 
    };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  // DELETE - eliminar producto por ID
  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return true;
  }
}
