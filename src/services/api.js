import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://61ef115cd593d20017dbb2d8.mockapi.io/'
    }),
    tagTypes:['Contact'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['Contact'],
        }),
        addContact: builder.mutation({
            query: ({name, number}) => ({
                url: `/contacts`,
                method: 'POST',
                body: {name, phone: number},
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
    }),
})

export const {
    useFetchContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation
} = contactApi;




