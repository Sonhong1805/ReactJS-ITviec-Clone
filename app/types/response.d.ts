interface IResponse<T> {
  isSuccess: boolean;
  message: string | string[];
  data: T;
}
