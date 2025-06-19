import { Router } from "express";
import { ping, imageSignerReq, retriveImage } from "../controllers/imageSigner";
import { validate } from "../middlewares/validate";
import {
  imageSignerFormSchema,
  imageSignerObjectIDSchema,
} from "../validators/imageSignerValidator";


const router = Router();

router.get("/", ping);

router.post(
  "/imageSign",
  validate(imageSignerFormSchema, "body"),
  imageSignerReq
);

router.get(
  "/image/:imageId",
  validate(imageSignerObjectIDSchema, "params"),
  retriveImage
);

export default router;
