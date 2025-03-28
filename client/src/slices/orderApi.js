import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    getMyOrders: builder.query({
      query: () => "/api/orders/myorders",
      providesTags: ["Order"],
    }),
    updateOrderToPaid: builder.mutation({
      query: ({ id, paymentSlip }) => ({
        url: `/api/orders/${id}/pay`,
        method: "PUT",
        body: { paymentSlip },
      }),
      invalidatesTags: ["Order"],
    }),
    getAvailableOrders: builder.query({
      query: () => "/api/orders/available",
      providesTags: ["Order"],
    }),
    acceptOrderForDelivery: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/accept`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useUpdateOrderToPaidMutation,
  useGetAvailableOrdersQuery,
  useAcceptOrderForDeliveryMutation,
  useUpdateOrderToDeliveredMutation,
} = orderApi;
