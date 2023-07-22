import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BlogData, CategoryProps, LoginProps, TagProps, UserProps } from '../../../types/apislice'
const baseUrl = import.meta.env.VITE_API_URL as string

// Auth services
export const authServices = createApi({
  reducerPath: 'authServices',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginProps, { email: string; password: string }>({
      query: (data) => {
        return {
          url: `/user/login/`,
          method: 'POST',
          body: data
        }
      }
    }),

    getUser: builder.query<UserProps, string>({
      query: (token) => {        
        return {
          url: '/user',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })
  })
})

export const { useLoginUserMutation, useGetUserQuery } = authServices

// Category services
export const categoryServices = createApi({
  reducerPath: 'categoryServices',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createCategory: builder.mutation<CategoryProps, { data: { name: string }; token: string }>({
      query: ({ data, token }) => {
        return {
          url: `/category`,
          method: 'POST',
          body: data,
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    }),

    getCategories: builder.query<CategoryProps, string>({
      query: (token) => {
        return {
          url: '/category',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })
  })
})

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryServices

// Tags services
export const tagServices = createApi({
  reducerPath: 'tagServices',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createTag: builder.mutation<TagProps, { data: { name: string }; token: string }>({
      query: ({ data, token }) => {
        return {
          url: `/tag`,
          method: 'POST',
          body: data,
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    }),

    getTags: builder.query<TagProps, string>({
      query: (token) => {
        return {
          url: '/tag',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })
  })
})

export const { useCreateTagMutation, useGetTagsQuery } = tagServices

// Blog services
export const blogServices = createApi({
  reducerPath: 'blogServices',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createBlog: builder.mutation<BlogData, { data: BlogData; token: string }>({
      query: ({ data, token }) => {
        return {
          url: `/blog`,
          method: 'POST',
          body: data,
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    }),

    getBlog: builder.query<BlogData, string>({
      query: (token) => {
        return {
          url: '/blog',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    }),

    getBlogBySlug: builder.query<BlogData, string>({
      query: (token) => {
        return {
          url: '/blog/:slug',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })
  })
})

export const { useCreateBlogMutation, useGetBlogBySlugQuery, useGetBlogQuery } = blogServices
