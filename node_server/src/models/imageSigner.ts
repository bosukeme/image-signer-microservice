import mongoose, { Schema } from "mongoose";
import { IImageSigner } from "../types/interfaces";
import { SignStatus } from "../types/interfaces";


const ImageSignerSchema: Schema = new Schema<IImageSigner>({
  email: { type: String, required: true },
  text: { type: String, required: true },
  imageName: {type: String, required: true},
  cloudinaryUrl: {type: String, default:""},
  status: {
    type: String,
    enum: Object.values(SignStatus),
    default: SignStatus.Pending,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IImageSigner>("ImageSigner", ImageSignerSchema);
