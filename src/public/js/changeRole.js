const userRole = document.currentScript.getAttribute("data-userRole");
const containerFormFiles = document.getElementById("container-formFiles");
const containerText = document.getElementById("container-text");
const changeRoleButton = document.getElementById("changeRoleButton");
const userId = document.currentScript.getAttribute("data-userId");
const formFiles = document.getElementById("formFiles");

userRole === "User"
  ? (containerFormFiles.style.display = "block")
  : (containerFormFiles.style.display = "none");

userRole === "User_premium"
  ? (containerText.style.display = "block")
  : (containerText.style.display = "none");

changeRoleButton.addEventListener("click", async () => {
  let responsePostDocuments = "";
  if (userRole === "User") {
    const formData = new FormData(formFiles);

    const postDocuments = await fetch(
      `http://localhost:8080/api/users/${userId}/documents`,
      {
        method: "POST",
        body: formData,
      }
    );

    responsePostDocuments = await postDocuments.json();

    if (responsePostDocuments.status !== "success") {
      document.getElementById("status").textContent =
        "Error, no se pudieron cargar los archivos";
    }
  }

  const putRole = await fetch(
    `http://localhost:8080/api/users/premium/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responsePutRole = await putRole.json();

  if (responsePutRole.status !== "success") {
    document.getElementById("statusPut").textContent =
      "Error, todos los archivos de documentación no fueron subidos. Sube todos los archivos de documentación para proseguir con el cambio de rol ";
  }

  if (
    responsePutRole.status === "success" ||
    (responsePostDocuments.status === "success" &&
      responsePutRole.status === "success")
  ) {
    window.location.replace("/logout");
  }
});
