/** Forma de todos los errores que devuelve el backend (AppExceptionFilter). */
export interface ApiError {
  message: string;
  statusCode: number;
}
