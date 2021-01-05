import axios from 'axios';
import {
  SET_CURRENT_USER,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCESS,
  HIDE_ALERT
} from './types';

export const login = (credentials, history) => dispatch => {
  console.log('Login Action')
  dispatch({ type: AUTH_LOGIN_REQUEST });
  
  axios.post(`/api/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data });
    }).then(() => {
      history.push('/');
    }).catch(err => {
      dispatch({ 
        type: AUTH_LOGIN_FAILED,
        payload: {
          status: err.response.status,
          message: err.response.data.message
        }
      });
    });
}

export const setCurrentUser = (user) => dispatch => {
  console.log('SetCurrentUser Action');

  dispatch({ type: SET_CURRENT_USER, payload: user });
}

export const logout = () => dispatch => {
  console.log('Logout Action')

  dispatch({ type: AUTH_LOGOUT_SUCCESS });
}

export const hideAlert = () => dispatch => {
  dispatch({ type: HIDE_ALERT })
}
