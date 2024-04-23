import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    credentials: "include",
    crossDomain: true,
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      // Accept: "application/json",
    // Accept: "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": `${process.env.REACT_APP_BASE_SERVER_URL}`,
    },
  }),
  reducePath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,     // This
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      // responseHandler: (response) => response.json(),
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,    // This
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: (id) => "general/dashboard",
      provideTags: ["Dashboard"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery,
    useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery } = api;
