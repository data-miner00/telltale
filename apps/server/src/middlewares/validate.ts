import { Request, Response, NextFunction } from 'express';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

export const validate =
  <T extends AnyObject>(schema: ObjectSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  };
