import express from "express";
import cors from 'cors';
import { errorHandler } from "./middlewares/errorHandler";
import imageSignerRoute from "./routes/imageSigner";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(imageSignerRoute);

app.use(errorHandler);

export default app;
