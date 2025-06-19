import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type RequestPart = 'body' | 'params';

export const validate = (schema: ObjectSchema, part: RequestPart = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[part]);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    next();
  };
};
