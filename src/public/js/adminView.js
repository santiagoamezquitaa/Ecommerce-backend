const changeRoleButton = document.getElementById("changeRoleButton");
const inputUserEmail = document.getElementById("userEmail");
const inputIdDelete = document.getElementById("idDelete");
const formFiles = document.getElementById("formFiles");
const formDeletUser = document.getElementById("formDeleteUser");

formDeletUser.addEventListener("submit", async (event) => {
  event.preventDefault();
  let deleteOneUser = "";
  if (inputIdDelete.value) {
    deleteOneUser = await fetch(`/api/users/${inputIdDelete.value}`, {
      method: "DELETE",
    });

    deleteOneUser = await deleteOneUser.json();

    if (deleteOneUser.status !== "success") {
      return;
    }
  }

  let deleteManyUsers = await fetch(`/api/users`, {
    method: "DELETE",
  });

  deleteManyUsers = await deleteManyUsers.json();

  let sendNotificationDelete = await fetch(`/mailDeletedAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteManyUsers.payload.userEmails),
  });

  sendNotificationDelete = await sendNotificationDelete.json();

  if (
    (deleteOneUser === null || deleteOneUser.status === "success") &&
    deleteManyUsers.status === "success" &&
    sendNotificationDelete.status === "success"
  ) {
    location.reload();
  }

  document.getElementById("formDeleteUser").reset();
});

changeRoleButton.addEventListener("click", async () => {
  let userData = await fetch(`/api/sessions/${inputUserEmail.value}`, {
    method: "GET",
  });

  userData = await userData.json();

  const user = userData.payload;

  let responsePostDocuments = "";
  if (user.role === "User") {
    const formData = new FormData(formFiles);

    const postDocuments = await fetch(`/api/users/${user._id}/documents`, {
      method: "POST",
      body: formData,
    });

    responsePostDocuments = await postDocuments.json();

    if (responsePostDocuments.status !== "success") {
      document.getElementById("status").textContent =
        "Error, no se pudieron cargar los archivos";
    }
  }

  const putRole = await fetch(`/api/users/premium/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

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
    location.reload();
  }
});
