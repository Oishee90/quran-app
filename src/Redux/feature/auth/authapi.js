import { apiSlice } from "../../api/apiSlice";
import { use } from "react";

export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    superAdminLogin: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/admin-login/",
        method: "POST",
        body: data,
      }),
    }),

    // dashboard
    getDasboard: builder.query({
      query: () => "api/v1/admin/",
    }),
    // recent activity
    getMiscByName: builder.query({
      query: (name) => `/api/v1/misc/${name}`,
    }),
    updateMiscByName: builder.mutation({
      query: ({ name, content }) => ({
        url: `/api/v1/misc/${name}/`,
        method: "PUT",
        body: { content, name },
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ email, is_blocked }) => ({
        url: "/api/v1/admin/users/update/",
        method: "PUT",
        body: {
          email,
          is_blocked,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSuperAdminLoginMutation,
  useGetDasboardQuery,
  useGetMiscByNameQuery,
  useUpdateMiscByNameMutation,
  useUpdateUserStatusMutation,
} = authapi;
