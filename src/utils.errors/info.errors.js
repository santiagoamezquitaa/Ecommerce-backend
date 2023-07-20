const generateProductErrorInfo = (product) => {
  console.log(`Una o mas propiedades están incompletas o no son validas.
    Propiedades requeridas:
    * title: Es de tipo String, tipo recibido: ${product.title},
    * description: Es de tipo String, tipo recibido: ${product.description},
    * price: Es de tipo Number, tipo recibido: ${product.price},
    * category: Es de tipo String, tipo recibido: ${product.category},
    * code: (debe ser unico) Es de tipo Number, tipo recibido: ${product.code},
    * stock: Es de tipo Number, tipo recibido: ${product.stock},
    * status: Es de tipo String, tipo recibido: ${product.status},
    * thumbnails: (opcional) Es de tipo Array, tipo recibido: ${product.thumbnails},`);
};

export default generateProductErrorInfo;
