import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const host = context.switchToHttp();

    return next.handle().pipe(
      tap((data) => {
        // 在这里可以修改响应头
        const response = host.getResponse();
        response.setHeader('Cache-Control', `max-age=60`);
      })
    );
  }
}
