const actualPage = document.currentScript.getAttribute("data-actualPage");
let hasPrevPage = document.currentScript.getAttribute("data-hasPrevPage");
let hasNextPage = document.currentScript.getAttribute("data-hasNextPage");
const cartId = document.currentScript.getAttribute("data-userCartId");
const userId = document.currentScript.getAttribute("data-userId");

const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");
const addToCartButton = document.querySelectorAll(".addToCartButton");
const convertUserRoleButton = document.getElementById("convertUserRole");

const userRole = convertUserRoleButton.getAttribute("data-userRole");

convertUserRoleButton.addEventListener("click", async () => {
  window.location.replace("/changeuserrole");
});

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

document.getElementById("buyNow").addEventListener("click", async () => {
  await fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
    method: "POST",
  });

  await fetch(`http://localhost:8080/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

document.getElementById("logout").addEventListener("click", () => {
  window.location.replace("/logout");
});
