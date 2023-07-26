import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  sessionTtl: process.env.SESSION_TTL,
  gitHubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  loggerEnviroment: process.env.LOGGER_ENVIROMENT,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.PASSWORD_GMAIL,
};
