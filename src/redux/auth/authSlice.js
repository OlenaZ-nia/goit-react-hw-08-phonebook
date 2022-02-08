import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/users';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
            state.user.name = payload.user.name;
            state.token = payload.token;
            state.isLoggedIn = true;
    },
    defaultState: (state) => {
      state = initialState;
    },

    logoutUser: () => initialState,
  },

    extraReducers: (builder) => {
      builder
        .addMatcher(userApi.endpoints.register.matchFulfilled,
          (state, { payload }) => {
            // console.log({ payload });
            state.token = payload.token;
            state.user = payload.user;
            state.isLoggedIn = true;
        });
      
      builder
        .addMatcher(userApi.endpoints.login.matchFulfilled,
          (state, { payload }) => {
            // console.log('login',{ payload });
            state.token = payload.token;
            state.user = payload.user;
            state.isLoggedIn = true;
          })
      .addMatcher(userApi.endpoints.login.matchRejected,
          (state, { payload }) => {
            // console.log('loginRejected', { payload });
            state.error = payload.data;
          });
      
      builder
        .addMatcher(userApi.endpoints.logout.matchFulfilled,
          (state, { payload }) => {
            // console.log('logout',{ payload });
            state.token = null;
            state.user = { name: null, email: null };
            state.isLoggedIn = false;
          });
      
      builder
        .addMatcher(userApi.endpoints.getCurrentUser.matchPending,
          (state, action) => {
            // console.log('pending', action);
            state.isFetchingCurrentUser = true;
      })
        .addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled,
          (state, {payload}) => {
        // console.log('fulfilled', action);
            state.user = payload;
            state.isLoggedIn = true;
            state.isFetchingCurrentUser = false;
      })
        .addMatcher(userApi.endpoints.getCurrentUser.matchRejected,
          (state) => {
            // console.log('rejected', action);
            state.isFetchingCurrentUser = false;
      });

      
    },
});

export default authSlice.reducer;


export const selectisFetchingCurrentUser = (state) => state.auth.isFetchingCurrentUser;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.user.name;

