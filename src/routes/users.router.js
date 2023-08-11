import usersController from "../controllers/users.controller.js";
import { uploader } from "../utils.js";
import BaseRouter from "./router.js";

export default class UsersRouter extends BaseRouter {
  init() {
    this.put("/premium/:uid", ["PUBLIC"], usersController.putUsersRole);

    this.post(
      "/:uid/documents",
      ["PUBLIC"],
      uploader.fields([
        { name: "fileProfilePicture", maxCount: 1 },
        { name: "fileProductPicture", maxCount: 1 },
        { name: "fileIdentification", maxCount: 1 },
        { name: "fileAddress", maxCount: 1 },
        { name: "fileStatementAccount", maxCount: 1 },
      ]),
      usersController.postDocuments
    );

    this.get("/", ["PUBLIC"], usersController.getUsers);

    this.delete("/", ["PUBLIC"], usersController.deleteManyUsers);

    this.delete("/:uid", ["PUBLIC"], usersController.deleteUser);
  }
}
