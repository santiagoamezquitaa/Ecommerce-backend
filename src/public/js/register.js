document
  .getElementById("formRegister")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputName = document.getElementById("firstName").value;
    const inputLastName = document.getElementById("lastName").value;
    const inputEmail = document.getElementById("email").value;
    const inputAge = document.getElementById("age").value;
    const inputPassword = document.getElementById("password").value;

    const newUser = {
      firstName: inputName,
      lastName: inputLastName,
      email: inputEmail,
      age: inputAge,
      password: inputPassword,
    };

    const response = await fetch(
      "http://localhost:8080/api/sessions/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    document.getElementById("formRegister").reset();

    const responseData = await response.json();
    if (responseData.status === "success") {
      window.location.replace("/login");
    }
  });
