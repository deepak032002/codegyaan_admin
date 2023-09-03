import { min } from "@material-tailwind/react/types/components/slider"
import { UserData } from "./authslice"

export interface LoginProps {
  message: string
  token: string
}

export interface UserProps {
  message: string
  userData: UserData
}

export interface Categories {
  _id: string
  name: string
}
export interface CategoryProps {
  categories: Categories[]
}

export interface Tags {
  _id: string
  name: string
}
export interface TagProps {
  tags: Tags[]
}

export interface Blog {
  _id?: string
  title: string
  description: string
  content: string
  category: Categories
  tags: Tags[]
  meta_title: string,
  meta_description: string
  banner: string
  author: {
    name: string
    email: string
    avtar: string
  }
  is_published: boolean
  slug: string
  createdAt: string
}
export interface BlogData {
  results: Blog[]
  page: number
  totalItem: number
  totalPage: number
  message: string
}

export interface SingleBlogData {
  results: Blog
  message: string
}
