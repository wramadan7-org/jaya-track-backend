export class ResponseDto<T> {
  message?: string;
  error?: string | null;
  statusCode?: number;
  data: T;
}
