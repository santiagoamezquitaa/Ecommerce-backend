const cartId = document.currentScript.getAttribute("data-cartId");
const buyNowButton = document.getElementById("buyNow");
const backButton = document.getElementById("back");
const containerResumePurchase = document.getElementById(
  "container_resume_purchase"
);

const processedProducts = document.getElementById("processedProducts");
const unprocessedProducts = document.getElementById("unprocessedProducts");
const codePurchase = document.getElementById("codePurchase");
const datePurchase = document.getElementById("datePurchase");
const totalAmount = document.getElementById("totalAmount");
const purchaser = document.getElementById("purchaser");

containerResumePurchase.style.display = "none";

let purchaseResponse = "";
let ticketResponse = "";

buyNowButton.addEventListener("click", async () => {
  purchaseResponse = await fetch(`/api/carts/${cartId}/purchase`, {
    method: "POST",
  });

  purchaseResponse = await purchaseResponse.json();

  ticketResponse = await fetch(`/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  ticketResponse = await ticketResponse.json();

  if (
    purchaseResponse.status === "success" &&
    ticketResponse.status === "success"
  ) {
    processedProducts.textContent = purchaseResponse.message.processedProducts;
    unprocessedProducts.textContent =
      purchaseResponse.message.unprocessedProducts;
    codePurchase.textContent = ticketResponse.message.code;
    datePurchase.textContent = ticketResponse.message.purchaseDatetime;
    totalAmount.textContent = ticketResponse.message.amount;
    purchaser.textContent = ticketResponse.message.purchaser;

    containerResumePurchase.style.display = "block";
  }
});

backButton.addEventListener("click", async () => {
  window.location.replace("/products");
});
