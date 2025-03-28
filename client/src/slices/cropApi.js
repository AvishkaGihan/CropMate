import { apiSlice } from "./apiSlice";

export const cropApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCrops: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/api/crops",
        params: { keyword, pageNumber },
      }),
      providesTags: ["Crop"],
    }),
    getCropById: builder.query({
      query: (id) => `/api/crops/${id}`,
      providesTags: (result, error, id) => [{ type: "Crop", id }],
    }),
    createCrop: builder.mutation({
      query: (cropData) => ({
        url: "/api/crops",
        method: "POST",
        body: cropData,
      }),
      invalidatesTags: ["Crop"],
    }),
    updateCrop: builder.mutation({
      query: ({ id, ...cropData }) => ({
        url: `/api/crops/${id}`,
        method: "PUT",
        body: cropData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Crop", id }],
    }),
    deleteCrop: builder.mutation({
      query: (id) => ({
        url: `/api/crops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Crop"],
    }),
  }),
});

export const {
  useGetCropsQuery,
  useGetCropByIdQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useDeleteCropMutation,
} = cropApi;
