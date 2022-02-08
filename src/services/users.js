import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/users',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
      
    register: builder.mutation({
        query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        headers: {
      'Content-Type': 'application/json',
    },
        body: credentials,
        }),
        invalidatesTags: ['User'],
      }),
    
    login: builder.mutation({
      query:  (credentials) => ({
        url: '/login',
        method: 'POST',
    //     headers: {
    //   'Content-Type': 'application/json',
    // },
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    logout: builder.mutation({
      query:  () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getCurrentUser: builder.query({
      query:  (id) => ({
        url: '/current',
        // method: 'GET',
        // body: credentials,
        // isAuth: queryApi.getState().auth.token,

      }),
      // providesTags: ['User'],
    }),

    // getCurrentUser: builder.query({
    //   queryFn:  async (arg, queryApi, _extraOptions, baseQuery) => {
    //     const isAuth = queryApi.getState().auth.token;
    //     if (!isAuth) {
          
    //     }
    //     const result= await baseQuery({
    //       url: '/current',
    //     })
    //     return result.data ? { data: result.data } : { error: result.error }
        
    //   },

  
  }),
    
    
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = userApi;

export const {
  endpoints: { login, logout, register, getCurrentUser },
} = userApi;