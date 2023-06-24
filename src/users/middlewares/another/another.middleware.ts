import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AnotherMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // lets say you are working with something like webhooks this middleware is for checking for signatures
    console.log('Another Middleware');

    next();
  }
}
