import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  db_url: process.env.DB_URL,
  redis_url: process.env.REDIS_URL,
  activation_secret: process.env.ACTIVATION_SECRET,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_service: process.env.SMTP_SERVICE,
  smtp_mail: process.env.SMTP_MAIL,
  smtp_pass: process.env.SMTP_PASS,
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  access_token_expire: process.env.ACCESS_TOKEN_EXPIRE,
  refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRE,
  session_expire: process.env.SESSION_EXPIRE,
  node_env: process.env.NODE_ENV,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_secret_key: process.env.CLOUD_SECRET_KEY,
};
