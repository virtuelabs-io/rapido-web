export interface Query {
  q: string,
  size: number,
  cursor?: string,
  return?: string,
  start?: number,
  sort?: string
}
