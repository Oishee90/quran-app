import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access_token: null,
  },
  reducers: {
    userSignUp: (state, action) => {
      // console.log(
      //   "This is from authSlice:",
      //   action.payload.schoolname,
      //   action.payload.access_token,
      //   action.payload.user
      // );

      state.user = action.payload.user || state.user;
      state.access_token = action.payload.access_token || state.access_token;
    },
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.token;
    },
    userUpdated: (state, action) => {
      // Update user profile
      state.user = { ...state.user, ...action.payload };
    },
    userLoggedOut: (state) => {
      // Clear user data and token

      state.user = null;
      state.access_token = null;
      localStorage.removeItem("auth");
      window.location.reload();
    },
  },
});
export const { userSignUp, userLoggedIn, userUpdated, userLoggedOut } =
  authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.access_token;

export const authReducer = authSlice.reducer;
