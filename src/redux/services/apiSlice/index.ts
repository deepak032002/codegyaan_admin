import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryProps, LoginProps, UserProps } from '../../../types/apislice'
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
