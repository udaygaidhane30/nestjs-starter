import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic') {
      return false;
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = decodedCredentials.split(':');

    return username === 'admin' && password === 'admin';
  }
}
