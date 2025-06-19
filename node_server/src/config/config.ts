import dotenv from "dotenv";
import { IConfig } from "../types/interfaces";

dotenv.config();

const config: IConfig = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongo_uri: process.env.MONGO_URI as string,
  queueName: process.env.QUEUE_NAME || "sign",
  rabbitMQUrl: process.env.RABBITMQURL || "amqp://localhost",
};

export default config;
