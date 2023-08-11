import mailController from "../controllers/mail.controller.js";
import BaseRouter from "./router.js";

export default class MailsRouter extends BaseRouter {
  init() {
    this.get(
      "/mailResetPassword/:mail/:token",
      ["PUBLIC"],
      mailController.getMailResetPassword
    );

    this.post(
      "/mailDeletedAccount",
      ["PUBLIC"],
      mailController.postMailDeleteAccount
    );
  }
}
