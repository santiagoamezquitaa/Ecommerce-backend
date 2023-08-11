document
  .getElementById("formLogin")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputEmailLogin = document.getElementById("emailLogin").value;
    const inputPassword = document.getElementById("password").value;

    const userLogin = {
      email: inputEmailLogin,
      password: inputPassword,
    };

    const response = await fetch(`/api/sessions/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });

    document.getElementById("formLogin").reset();

    const responseData = await response.json();
    if (responseData.status === "success") {
      window.location.replace("/products");
    } else {
      document.getElementById("status").textContent =
        "Error, las credenciales no son correctas";
    }
  });

document.getElementById("redirectSingUp").addEventListener("click", (event) => {
  window.location.replace("/api/sessions/register");
});

document.getElementById("loginGithub").addEventListener("click", (event) => {
  window.location.replace("/api/sessions/github");
});

document.getElementById("forgotPassword").addEventListener("click", (event) => {
  window.location.replace("/forgotpassword");
});
