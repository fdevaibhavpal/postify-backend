import dotenv from "dotenv";
dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const domain = process.env.DB_DOMAIN;
const projectName = process.env.APP_NAME;
const MONGODB_URI = `mongodb+srv://${username}:${password}@${domain}/?retryWrites=true&w=majority&appName=${projectName}`;

export default {
  MONGO_URI: MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET  || "your_jwt_secret",
};
