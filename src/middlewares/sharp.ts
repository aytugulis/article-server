import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import expressAsyncHandler from 'express-async-handler';

export const shapeImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      sharp.cache(false);
      const buffer = await sharp(req.file.path).webp().toBuffer();
      await sharp(buffer).toFile(req.file.path);
    }
    next();
  },
);
