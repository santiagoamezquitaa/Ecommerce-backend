import dotenv from "dotenv";

dotenv.config();

let port = process.env.PORT || 8080;
let enviroment = process.env.ENVIROMENT;

export default {
  port,
  mongoUrl: process.env.MONGO_URL,
  sessionTtl: process.env.SESSION_TTL,
  gitHubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  enviroment,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.PASSWORD_GMAIL,
  baseUrl:
    enviroment === "production"
      ? process.env.BASE_URL_PROD
      : `${process.env.BASE_URL_DEV}${port}`,
};
