/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  interface Request {
    user?: any;
    data?: any;
    savedFile?: any;
  }
}
