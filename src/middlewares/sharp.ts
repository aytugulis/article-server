import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import expressAsyncHandler from 'express-async-handler';

export const shapeImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const isUserImage = req.file.path.includes('user');
      sharp.cache(false);

      if (!isUserImage) {
        const buffer = await sharp(req.file.path)
          .resize({ width: 1280, height: 720 })
          .webp()
          .toBuffer();

        await sharp(buffer).toFile(
          req.file.path.replace('.webp', '_banner.webp'),
        );
      }

      const buffer = await sharp(req.file.path)
        .resize(
          isUserImage
            ? { width: 100, height: 100, position: 'top' }
            : { width: 288, height: 162 },
        )
        .webp()
        .toBuffer();

      await sharp(buffer).toFile(req.file.path);
    }
    next();
  },
);
