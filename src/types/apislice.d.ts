import { UserData } from './authslice'

export interface LoginProps {
  message: string
  token: string
}

export interface UserProps {
  message: string
  userData: UserData
}

export interface CategoryProps {
  id: string
  name: string
}
