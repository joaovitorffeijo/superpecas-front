export interface ApiResponse {
  status: number,
  message: string,
  result: Result,
}

export interface Result {
  content: any[],
  totalElements?: number,
  totalPages?: number,
  last?: boolean,
  numberOfElements?: number,
  first?: boolean,
  number?: number,
}
