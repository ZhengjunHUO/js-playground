import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Next, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

// Test with http://127.0.0.1:3000/proxy?url=https%3A%2F%2Fkernel.org
//           http://127.0.0.1:3000/proxy?url=http%3A%2F%2F127.0.0.1%3A8001%2Fapp
const proxy = createProxyMiddleware({
  router: (req: Request) => {
    return req.query.url as string;
  },
  on: {
    proxyReq: (proxyReq, req: Request, res: Response) => {
      const session: Record<string, any> = req.session;
      const access_token = session.tokenSet.access_token;
      proxyReq.setHeader('authorization', `Bearer ${access_token}`);
    },
  },
  ignorePath: true,
  changeOrigin: true,
});

@Controller('proxy')
@UseGuards(AuthGuard)
export class ProxyController {
  @All()
  get(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    proxy(req, res, next);
  }
}
