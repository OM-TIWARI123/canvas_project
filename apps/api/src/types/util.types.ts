export interface ApiData<Payload, Response> {
  payload: Payload;
  response: Response;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}
