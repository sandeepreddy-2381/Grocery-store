// src/services/supplierApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = "http://localhost:8000/"
const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      // const token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGlyaXNoYXJlZGR5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjE3ODAwMywiZXhwIjoxNzIyMjY0NDAzfQ.mIZDIDqIBM7eRwc5yFYaAlrOUj2nVAsxoB0rVI-VpCY"
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
});

export const supplierApi = createApi({
  reducerPath: 'supplierApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchSupplier: builder.query({
      query: (keyword) => `/suppliers/search?keyword=${keyword}`,
    }),
    getAllSuppliers: builder.query({
      query: () => '/suppliers',
    }),
    getSupplierById: builder.query({
      query: (id) => `/suppliers/${id}`,
    }),
    updateSupplier: builder.mutation({
      query: ({ id, supplier }) => ({
        url: `/suppliers/${id}`,
        method: 'PATCH',
        body: supplier,
      }),
    }),
  }),
});

export const {
  useSearchSupplierQuery,
  useGetAllSuppliersQuery,
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
} = supplierApi;