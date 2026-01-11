import { apiSlice } from "../../api/apiSlice";


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
      query: () => "/api/v1/statistics/",
    }),
    // recent activity
    getRecentActivity: builder.query({
      query: () => "/api/v1/user-recent-activity/",
    }),
    // all user
    getAllUsers: builder.query({
      query: () => "/api/v1/all-users/",
    }),
    getSingleUser: builder.query({
      query: (id) => `/api/v1/view-user/${id}/`,
    }),
    // quotes
    createCategory: builder.mutation({
      query: (body) => ({
        url: "api/v1/create-category/",
        method: "POST",
        body,
      }),
    }),
    // get category
    getAllCategories: builder.query({
      query: () => "/api/v1/all-categories/",
    }),
    // get category
    getAllQuote: builder.query({
      query: () => "api/v1/all-quote-packets/",
      providesTags: ["Quote"],
    }),

    createQuotePack: builder.mutation({
      query: (formData) => ({
        url: "api/v1/create-quote-packet/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Quote"],
    }),

    getUserFeedback: builder.query({
      query: () => `api/v1/all-feedbacks/`,
    }),
    // Payment history
    getPaymentHistory: builder.query({
      query: () => `api/v1/all-user-subscriptions/`,
    }),
    getSubscriptions: builder.query({
      query: () => `api/v1/plans/`,
    }),
    // terms

    getPrivacy: builder.query({
      query: () => `api/v1/privacy-policy-admin/`,
    }),
    // privacy

    getterms: builder.query({
      query: () => `api/v1/terms-and-conditions-admin/`,
    }),
    //
    updateUserStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `api/v1/update-user-status/${id}/`,
        method: "PUT",
        body: { is_active },
      }),
      invalidatesTags: ["Users"], // Refetch all users after status update
    }),
    deleteQuotePack: builder.mutation({
      query: (id) => ({
        url: `api/v1/quote-packet/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quote"],
    }),
    // update subscription
    updatePlan: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/plan-update/${id}/`,
        method: "PUT",
        body,
      }),
    }),

    //  change password

    changePassword: builder.mutation({
      query: (data) => ({
        url: "api/v1/admin/change-password/",
        method: "POST",
        body: data,
      }),
    }),
    // terms update
    updateTermsAndConditions: builder.mutation({
      query: (payload) => ({
        url: "api/v1/terms-and-conditions-admin/",
        method: "PUT",
        body: payload,
      }),
    }),
    updatePrivacy: builder.mutation({
      query: (payload) => ({
        url: "api/v1/privacy-policy-admin/",
        method: "PUT",
        body: payload,
      }),
    }),
    // update quote
    updateQuote: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/v1/quote-packet/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quote"],
    }),
    getSingleQuotePack: builder.query({
      query: (id) => ({
        url: `api/v1/category-quote-packets/${id}`,
        method: "GET",
      }),
    }),
    getSingleCatQuotePack: builder.query({
      query: (id) => ({
        url: `api/v1/quote-packet/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSuperAdminLoginMutation,
  useGetDasboardQuery,
  useGetRecentActivityQuery,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useGetSingleUserQuery,
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllQuoteQuery,
  useCreateQuotePackMutation,
  useGetUserFeedbackQuery,
  useGetPrivacyQuery,
  useGettermsQuery,
  useDeleteQuotePackMutation,
  useChangePasswordMutation,
  useUpdateTermsAndConditionsMutation,
  useUpdatePrivacyMutation,
  useGetPaymentHistoryQuery,
  useGetSubscriptionsQuery,
  useUpdatePlanMutation,
  useUpdateQuoteMutation,
  useGetSingleQuotePackQuery,
  useGetSingleCatQuotePackQuery,
} = authapi;
