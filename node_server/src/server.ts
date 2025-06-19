import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import connectDB from "./database";
import { closeRabbitMQ } from "./queue/server";

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\nCaught ${signal}, shutting down gracefully...`);

      try {
        await closeRabbitMQ();
        console.log("RabbitMQ connection/channel closed");

        await mongoose.disconnect();
        console.log("MongoDB disconnected");

        server.close(() => {
          console.log("HTTP server closed");
          process.exit(0);
        });
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
