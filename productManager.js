class ProductManager {
    constructor() {
        this.products = [];
        this.productId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return("Faltan campos en el producto, todos son obligatorios");
        } else if (this.products.find((element) => element.code === product.code)){
            return(`El código ${product.code} ya existe en la lista de productos. Intentalo con un nuevo código`);
        } else {
            product.id = this.productId;
            this.productId++;
            this.products.push(product);
            return(`El producto llamado "${product.title}" con codigo "${product.code}" fue agregado exitosamente.`);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const productFound = this.products.find((element) => element.id === productId);
        if (productFound) {
            return productFound;
        } else {
            return(`Not Found: Id ${productId}`);
        }
    }
}

//Instanciar clase
const productsManager = new ProductManager;

//Agregar primer producto
console.log(productsManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100000,
    thumbnail: "ruta/imagen1.jpg",
    code: 153,
    stock: 10
  }));

//Agregar producto sin todos los campos llenos
console.log(productsManager.addProduct({
    title: '',
    description: "Descripción del producto 2",
    price: '',
    thumbnail: "ruta/imagen2.jpg",
    code: 112,
    stock: 8
  }));

//Agregar tercer producto y se incrementa el id automáticamente
console.log(productsManager.addProduct({
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 35000,
    thumbnail: "ruta/imagen3.jpg",
    code: 232,
    stock: 5
  }));

//Agregar producto con codigo repetido
console.log(productsManager.addProduct({
    title: "Producto 4",
    description: "Descripción del producto 4",
    price: 5600,
    thumbnail: "ruta/imagen4.jpg",
    code: 153,
    stock: 50
  }));

//Traer todo el arreglo de productos
console.log("Todos los productos: ", productsManager.getProducts());

//Busqueda de un producto através de su id
console.log("Busqueda de producto por id: ", productsManager.getProductById(2));

//Busqueda de un producto através de su id y que no exista
console.log("Busqueda de producto por id: ", productsManager.getProductById(81));

