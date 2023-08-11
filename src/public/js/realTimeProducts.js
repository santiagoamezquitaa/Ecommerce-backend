const socket = io();

socket.on("productAdded", (newProduct) => {
  const container = document.getElementById("container");
  const div = document.createElement("div");
  div.className = "productsList";
  div.setAttribute("data-id", `${newProduct._id}`);

  const propiedades = [
    "Nombre",
    "Descripción",
    "Precio",
    "Categoría",
    "Código",
    "Existencias",
    "Id del producto",
  ];
  const valores = [
    newProduct.title,
    newProduct.description,
    newProduct.price,
    newProduct.category,
    newProduct.code,
    newProduct.stock,
    newProduct._id,
  ];

  propiedades.forEach((propiedad, index) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = propiedad + ": ";
    const texto = document.createTextNode(valores[index]);
    p.appendChild(strong);
    p.appendChild(texto);
    div.appendChild(p);
  });

  container.appendChild(div);
});

socket.on("productDeleted", (idProductDelete) => {
  const container = document.getElementById("container");
  const productsList = container.getElementsByClassName("productsList");

  for (let i = 0; i < productsList.length; i++) {
    const product = productsList[i];
    const productId = product.getAttribute("data-id");

    if (productId === idProductDelete.toString()) {
      product.remove();
      break;
    }
  }
});

document
  .getElementById("formAddProduct")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const arrayThumbnail = [];

    const inputTitle = document.getElementById("title").value;
    const inputDescription = document.getElementById("description").value;
    const inputPrice = document.getElementById("price").value;
    const inputCategory = document.getElementById("category").value;
    const inputCode = document.getElementById("code").value;
    const inputStock = document.getElementById("stock").value;
    const inputThumbnail = document.getElementById("thumbnail").value;
    const inputStatus = document.getElementById("status").value;

    const newProduct = {
      title: inputTitle,
      description: inputDescription,
      price: parseInt(inputPrice),
      category: inputCategory,
      code: parseInt(inputCode),
      stock: parseInt(inputStock),
      thumbnail: arrayThumbnail.push(inputThumbnail),
      status: inputStatus,
    };

    await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    document.getElementById("formAddProduct").reset();
  });

document
  .getElementById("formDeleteProduct")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputIdDelete = document.getElementById("idDelete").value;

    await fetch(`/api/products/${inputIdDelete}`, {
      method: "DELETE",
    });

    document.getElementById("formDeleteProduct").reset();
  });
