import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCESS,
  HIDE_ALERT
} from './types';

const initialState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem('jwtToken', JSON.stringify(payload));

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_LOGIN_FAILED:
    case AUTH_LOGOUT_SUCCESS:
      localStorage.removeItem('jwtToken');

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case HIDE_ALERT:
      return {
        ...state,
        errors: null,
        success: null,
      };
    default: return state;
  }
}
