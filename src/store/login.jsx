import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helper/createAsyncSlice';
import getLocalStorage from './helper/getLocalStorage';

const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token: getLocalStorage('token', null),
    },
  },
  reducers: {
    removeToken(state) {
      state.data.token = null; // Correção aqui para definir o token como null em vez de todo o objeto data
    },
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: 'token',
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (user) => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: 'user',
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: (token) => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  }),
});

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;
const { removeToken } = token.actions;
const { removeUser } = user.actions; // Correção aqui, deve ser actions do user, não do token

export default reducer;

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user));
    if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
  } catch {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.login.token.data;
  if (token) await dispatch(fetchUser(token));
};

export const userLogout = () => (dispatch) => {
  dispatch(removeUser()); // Correção aqui, deve ser uma função para chamar a action
  dispatch(removeToken()); // Correção aqui, deve ser uma função para chamar a action
  window.localStorage.removeItem('token');
};
