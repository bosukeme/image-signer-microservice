import { getChannel } from "./server";

export async function publishMessage(
  queue: string,
  message: string
): Promise<void> {
  try {
    const ch = await getChannel();
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to "${queue}": ${message}`);
  } catch (error) {
    console.error(`Failed to publish message to "${queue}":`, error);
    throw error;
  }
}
