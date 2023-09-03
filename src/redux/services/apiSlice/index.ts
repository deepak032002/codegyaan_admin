import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog, BlogData, CategoryProps, LoginProps, SingleBlogData, TagProps, UserProps } from '../../../types/apislice'
import formDataSerializer from '../../../utils/formDataSerializer';
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

    getUser: builder.query<UserProps, { token: string }>({
      query: ({ token }) => {
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

    getCategories: builder.query<CategoryProps, { token: string }>({
      query: ({ token }) => {
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

    getTags: builder.query<TagProps, { token: string }>({
      query: ({ token }) => {
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
    createBlog: builder.mutation<BlogData, { data: any; token: string }>({
      query: ({ data, token }) => {
        const formData = formDataSerializer(data)
        return {
          url: `/blog`,
          method: 'POST',
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
          formData: true
        }
      }
    }),

    updateBlog: builder.mutation<{ message: string, blog: Blog }, { data: any; token: string, slug: string }>({
      query: ({ data, token, slug }) => {
        const formData = formDataSerializer(data)
        return {
          url: `/blog/${slug}`,
          method: 'PATCH',
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
          formData: true,
        }
      }
    }),

    getBlog: builder.query<BlogData, { token: string, page?: number, per_page_items?: number, query?: string }>({
      query: (payload) => {
        return {
          url: `/blog/?page=${payload.page || 1}&item_per_page=${payload.per_page_items || 10}&search=${payload.query || ""}`,
          method: 'GET',
          headers: {
            authorization: `Bearer ${payload.token}`
          }
        }
      }
    }),

    getBlogBySlug: builder.query<SingleBlogData, { token: string, slug: string }>({
      query: (payload) => {
        return {
          url: `/blog/${payload.slug}`,
          method: 'GET',
          headers: {
            authorization: `Bearer ${payload.token}`
          }
        }
      }
    }),

    publishBlog: builder.mutation<BlogData, { token: string, id: string }>({
      query: (payload) => {
        return {
          url: `/blog/publish-blog/${payload.id}`,
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${payload.token}`
          }
        }
      }
    })
  })
})

export const { useCreateBlogMutation, useGetBlogBySlugQuery, useGetBlogQuery, usePublishBlogMutation, useUpdateBlogMutation } = blogServices
