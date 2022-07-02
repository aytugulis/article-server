import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import expressAsyncHandler from 'express-async-handler';

export const shapeImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      await sharp(req.file.path)
        .webp()
        .toFile(
          path.resolve(
            req.file.destination,
            `${req.file.filename.split('.')[0]}.webp`,
          ),
        );

      fs.unlinkSync(req.file.path);
    }

    next();
  },
);
