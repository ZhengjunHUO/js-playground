import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[INFO] Recv request from ${req.ip} for ${req.url}`);
    next();
  }
}

export function loggerFn(req: Request, res: Response, next: NextFunction) {
  console.log(`[INFO] Request method: ${req.method}`);
  next();
}
