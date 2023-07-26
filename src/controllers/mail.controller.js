import nodemailer from "nodemailer";
import config from "../config/config.js";

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
        <a href="http://localhost:${config.port}/resetpassword/${token}/${email}"><button>RESTABLECER!</button></a>
      </div>
      `,
      attachments: [],
    });
    return res.status(200).send({ status: "success", result: result });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  getMailResetPassword,
};
