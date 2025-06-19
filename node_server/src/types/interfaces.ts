import mongoose, { Document } from "mongoose";

export interface IConfig {
  port: number;
  nodeEnv: string;
  mongo_uri: string;
  queueName: string;
  rabbitMQUrl: string;
}

export interface IAppError extends Error {
  status?: number;
}

export interface IRateLimitConfig {
  limit: number;
  windowSeconds: number;
}

export enum SignStatus {
  Pending = "Pending",
  Completed = "Completed",
}

export interface IImageSigner extends Document {
  email: string;
  text: string;
  status: SignStatus;
  imageName: string;
  cloudinaryUrl?: string;
  createdAt: Date;
}
