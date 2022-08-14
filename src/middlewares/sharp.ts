import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import expressAsyncHandler from 'express-async-handler';

export const shapeImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const isUserImage = req.file.path.includes('user');
      sharp.cache(false);
      const buffer = await sharp(req.file.path)
        .resize(isUserImage ? {} : { height: 900, width: 1600 })
        .webp({ quality: 50 })
        .toBuffer();
      await sharp(buffer).toFile(req.file.path);
    }
    next();
  },
);
