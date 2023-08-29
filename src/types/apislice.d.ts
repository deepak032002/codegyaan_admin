import { UserData } from "./authslice";

export interface LoginProps {
  message: string;
  token: string;
}

export interface UserProps {
  message: string;
  userData: UserData;
}

export interface Categories {
  _id: string;
  name: string;
}
export interface CategoryProps {
  categories: Categories[];
}

export interface Tags {
  _id: string;
  name: string;
}
export interface TagProps {
  tags: Tags[];
}

export interface Blogs {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: Tags[];
  author: { name: string; email: string; avtar: string };
  is_published: boolean;
}
export interface BlogData {
  results: Blogs[];
  page: number,
  total: number,
  message: string;
}
