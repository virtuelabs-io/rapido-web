export interface Query {
  q?: string,
  size?: number,
  cursor?: string,
  return?: string,
  start?: number,
  sort?: string,
  parser?:string,
  searchedText?:string,
  releatedSearch?:string,
  fieldsQuery?:string,
  qdotparser?: string,
  rating?:string,
  price?:string
}
