import { userRes } from 'data/response'

export type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  introduction: string
  image: string
  prefecture: number
}
export type SignUpFormData = FormData & {
  append(name: keyof SignUpData, value: String | Blob, fileName?: string): any
}
export type SignInData = {
  email: string
  password: string
}
export type User = typeof userRes
export type SignInRes = { data: User }
