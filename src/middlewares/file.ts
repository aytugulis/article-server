import { Request } from 'express';
import path from 'path';
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
      const currentUrl =
        type === 'article' ? req?.data?.imageUrl : req?.user?.imageUrl;
      if (currentUrl && currentUrl !== 'default.webp')
        req.savedFile = currentUrl.split('.')[0] + '.webp';
      else req.savedFile = v4() + '.webp';

      cb(null, req.savedFile);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedMimeTypes = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new AppError(400, 'Please provide a valid image file'));
    }
    return cb(null, true);
  };

  const limits = { fileSize: 30 * 1024 * 1024 };

  return multer({ storage, fileFilter, limits });
}
