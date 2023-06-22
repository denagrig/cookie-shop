type Cookies = {
  id:number,
  count:number,
}
  
type User = {
  name:string,
  password: string,
  alergens: string[],
}

export type {User, Cookies}