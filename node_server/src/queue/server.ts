import { connect, Channel, ChannelModel } from "amqplib";
import config from "../config/config";


let connection: ChannelModel;
let channel: Channel;

export async function getChannel(): Promise<Channel> {
  if (channel) {
    return channel;
  }

  if (!connection) {
    try {
      console.log(`RMQ: ${config.rabbitMQUrl}`);
      
      connection = await connect(config.rabbitMQUrl);
      console.log("RabbitMQ connection established");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
      throw new Error("Failed to establish RabbitMQ connection.");
    }
  }

  try {
    channel = await connection.createChannel();
    console.log("RabbitMQ channel created");
    return channel;
  } catch (error) {
    console.error("Failed to create RabbitMQ channel:", error);
    throw new Error("Failed to create RabbitMQ channel.");
  }
}

export async function closeRabbitMQ(): Promise<void> {
  if (channel) {
    try {
      await channel.close();
      console.log("RabbitMQ channel closed");
    } catch (error) {
      console.error("Error closing RabbitMQ channel:", error);
    }
  }
  if (connection) {
    try {
      await connection.close();
      console.log("RabbitMQ connection closed");
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
    }
  }
}
