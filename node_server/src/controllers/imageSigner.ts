import { Request, Response, NextFunction } from "express";

import config from "../config/config";
import ImageSigner from "../models/imageSigner";
import { SignStatus } from "../types/interfaces";
import {publishMessage} from "../queue/publisher";


export const ping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("pong");
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const imageSignerReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, text, imageName } = req.body;

    const status = SignStatus.Pending;

    const imgDoc = await ImageSigner.create({
      email,
      text,
      status,
      imageName,
    });

    const message = {
      imageId: imgDoc._id,
      email,
      text,
      imageName,
    };

    const messageStr = JSON.stringify(message)
    await publishMessage(config.queueName, messageStr)

    res.status(201).json({
      message: "Success",
      data: imgDoc,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const retriveImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imageId } = req.params;
    
    const image = await ImageSigner.findById(imageId);

    if (!image) {
      res.status(404).json({ error: "Image ID does not exist" });
      return;
    }
    const cloudinaryUrl = image.cloudinaryUrl
    res
      .status(200)
      .json({ message: "Image retrieved successfully", cloudinaryUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
