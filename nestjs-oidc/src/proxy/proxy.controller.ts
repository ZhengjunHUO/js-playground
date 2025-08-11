import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Test with http://127.0.0.1:3000/proxy?url=https%3A%2F%2Fkernel.org

const proxy = createProxyMiddleware({
  router: (req: Request) => {
    return req.query.url as string;
  },
  ignorePath: true,
  changeOrigin: true,
});

@Controller('proxy')
export class ProxyController {
  @All()
  get(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    proxy(req, res, next);
  }
}
