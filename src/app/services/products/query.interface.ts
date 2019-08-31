export interface Query {
  q: string,
  size: number,
  cursor?: string,
  return?: string,
  start?: number,
  sort?: string,
  parser?:string,
  searchedText?:string,
  releatedSearch?:string,
  qdotparser?: string
}
