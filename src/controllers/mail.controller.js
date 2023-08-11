import nodemailer from "nodemailer";
import config from "../config/config.js";
import { logger } from "../utils.loggers/logger.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailUser,
    pass: config.gmailPassword,
  },
});

const getMailResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const email = req.params.mail;

    const result = await transport.sendMail({
      from: `Ecommerce ${config.gmailUser}`,
      to: email,
      subject: "Restauración contraseña Ecommerce",
      html: `
      <div>
        <h1>Presiona el boton para restablecer tu contraseña</h1>
        <a href="${config.baseUrl}/resetpassword/${token}/${email}"><button>RESTABLECER!</button></a>
      </div>
      `,
      attachments: [],
    });
    return res.status(200).send({ status: "success", result: result });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const postMailDeleteAccount = async (req, res) => {
  try {
    const emails = req.body;

    if (Object.keys(emails).length === 0) {
      return res.status(200).send({
        status: "success",
        message: "No hay correos a los cuales enviar",
      });
    }

    for (const email of emails) {
      await transport.sendMail({
        from: `Ecommerce ${config.gmailUser}`,
        to: email,
        subject: "Cuenta borrada por inactividad",
        html: `
          <div>
            <h1>Tu cuenta ha sido borrada por inactividad</h1>
          </div>
        `,
        attachments: [],
      });

      logger.info(`Correo por inactividad enviado a: ${email}`);
    }

    return res
      .status(200)
      .send({ status: "success", message: "Correos enviados exitosamente" });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const mailDeleteProduct = async (email) => {
  if (!email) {
    return res.status(400).send({
      status: "error",
      error: "No hay correo al cual enviar",
    });
  }

  const result = await transport.sendMail({
    from: `Ecommerce ${config.gmailUser}`,
    to: email,
    subject: "Tu producto fue eliminado",
    html: `
      <div>
        <h1>Tu producto fue eliminado de nuestro catalogo</h1>
      </div>
      `,
    attachments: [],
  });
};

export default {
  getMailResetPassword,
  postMailDeleteAccount,
  mailDeleteProduct,
};
