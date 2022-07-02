import { NextFunction, Request } from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { v4 } from 'uuid';
import multer, { FileFilterCallback } from 'multer';
import { AppError } from '../helpers/AppError';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export function uploadFile(type: 'user' | 'article') {
  const storage = multer.diskStorage({
    destination: function (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) {
      const dirName = require?.main?.filename;
      if (!dirName)
        return new AppError(400, 'Please provide a valid image file');

      const rootDir = path.dirname(dirName);
      cb(null, path.join(rootDir, `/uploads/${type}`));
    },
    filename: function (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) {
      /*       if (req?.data?.imageUrl) {
        const url =
          req?.data?.imageUrl === 'default.jpg' ? null : req.data.imageUrl;

        const extension = file.mimetype.split('/')[1];

        req.savedFile = `${url || v4()}.${extension}`;

        if (!url) req.data.imageUrl = req.savedFile;
      }
 */
      const extension = file.mimetype.split('/')[1];
      req.savedFile = `${v4()}.${extension}`;

      /*       console.log(`${process.env.BASE_URL}/${type}/${req.savedFile}`); */
      /*       console.log(path.join(require?.main?.filename!, `/uploads/${type}`)); */

      cb(null, req.savedFile);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new AppError(400, 'Please provide a valid image file'));
    }
    return cb(null, true);
  };

  return multer({ storage, fileFilter });
}
