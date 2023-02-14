export interface IUser {
  id: string
  firstName: string
  lastName: string
  jwt?: string
  email: string
  role: string
  password: string
}

export interface IPerson {
  firstName: string
  lastName: string
  email: string
  id: string
  // picture: string
  // title: string
}
