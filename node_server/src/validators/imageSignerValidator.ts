import Joi from "joi";

export const imageSignerFormSchema = Joi.object({
  email: Joi.string().email().required(),
  text: Joi.string().min(1).required(),
  imageName: Joi.string().min(1).required(),
});


export const imageSignerObjectIDSchema = Joi.object({
  imageId: Joi.string().length(24).hex().required(),
});