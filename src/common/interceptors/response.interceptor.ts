import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CustomResponse<T> {
  message: string;
  error?: string | null;
  statusCode: number;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  CustomResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CustomResponse<T>> {
    const http = context.switchToHttp();
    const response = http.getResponse<{ statusCode: number }>();

    return next.handle().pipe(
      map((result: T | CustomResponse<T>) => {
        const responseWrapper = result as CustomResponse<T>;

        return {
          message: responseWrapper.message ?? 'Success',
          error: responseWrapper.error ?? null,
          statusCode: responseWrapper.statusCode ?? response.statusCode ?? 200,
          data:
            responseWrapper.data !== undefined
              ? responseWrapper.data
              : (result as T),
        };
      }),
    );
  }
}
