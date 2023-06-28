const actualPage = document.currentScript.getAttribute("data-actualPage");
let hasPrevPage = document.currentScript.getAttribute("data-hasPrevPage");
let hasNextPage = document.currentScript.getAttribute("data-hasNextPage");

const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");
const addToCartButton = document.querySelectorAll(".addToCartButton");

const cartId = "64965bc632f39e0243d82ffb";

hasPrevPage = hasPrevPage === "true";
hasNextPage = hasNextPage === "true";

prevPageButton.disabled = !hasPrevPage;
nextPageButton.disabled = !hasNextPage;

prevPageButton.addEventListener("click", () => {
  window.location.href = `http://localhost:8080/products?page=${
    parseInt(actualPage) - 1
  }`;
});

nextPageButton.addEventListener("click", () => {
  window.location.href = `http://localhost:8080/products?page=${
    parseInt(actualPage) + 1
  }`;
});

addToCartButton.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.parentNode.getAttribute("data-id");

    await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});

document.getElementById("logout").addEventListener("click", () => {
  window.location.replace("/logout");
});
