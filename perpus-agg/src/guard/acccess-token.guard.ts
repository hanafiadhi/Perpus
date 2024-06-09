import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_QUEUE } from 'src/common/constants/services';
import { Request } from 'express';

export class AccessTokenGuard implements CanActivate {
  constructor(@Inject(AUTH_QUEUE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined =
      await this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await firstValueFrom(
        this.client.send('verify-token', token),
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  private async extractTokenFromHeader(
    request: Request,
  ): Promise<string | undefined> {
    const token = request.headers.authorization?.split(' ')[1] ?? undefined;
    return token;
  }
}
