document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputEmail = document.getElementById("email").value;

    const responseFindEmail = await fetch(`/api/sessions/${inputEmail}`, {
      method: "GET",
    });

    const emailData = await responseFindEmail.json();

    if (emailData.status !== "success") {
      return (document.getElementById("status").textContent =
        "El email no existe en nuestros registros");
    }

    const responseGenerateToken = await fetch(`/api/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = await responseGenerateToken.json();

    const response = await fetch(
      `/mailResetPassword/${inputEmail}/${token.token}`,
      {
        method: "GET",
      }
    );

    document.getElementById("forgotPasswordForm").reset();

    const responseData = await response.json();
    if (responseData.status === "success") {
      window.location.replace("/login");
    } else {
      document.getElementById("status").textContent =
        "Ups! Hubo un error, vuelve a intentarlo";
    }
  });
