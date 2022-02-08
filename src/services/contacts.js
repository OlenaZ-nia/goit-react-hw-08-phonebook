import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
        prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
    }),
    tagTypes:['Contact'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => '/contacts',
            keepUnusedDataFor: 0,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Contact", id })),
                        'Contact',
                    ]
                    : ['Contact'],
        }),
        addContact: builder.mutation({
            query: ({name, number}) => ({
                url: `/contacts`,
                method: 'POST',
                headers: {
      'Content-Type': 'application/json',
    },
                body: {name, number},
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: (contactId) => ({
                url: `contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
        updateContact: builder.mutation({
            query: (contactId) => ({
                url: `contacts/${contactId}`,
                headers: {
      'Content-Type': 'application/json',
    },
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
})

export const {
    useFetchContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation
} = contactApi;




