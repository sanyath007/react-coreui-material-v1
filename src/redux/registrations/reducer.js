import {
  FETCH_REGISTRATIONS_REQUEST,
  FETCH_REGISTRATIONS_SUCCESS,
  FETCH_REGISTRATIONS_FAILED,
  FETCH_REGISTRATION_REQUEST,
  FETCH_REGISTRATION_SUCCESS,
  FETCH_REGISTRATION_FAILED,
  ADD_REGISTRATION_REQUEST,
  ADD_REGISTRATION_SUCCESS,
  ADD_REGISTRATION_FAILED,
  UPDATE_REGISTRATION_REQUEST,
  UPDATE_REGISTRATION_SUCCESS,
  UPDATE_REGISTRATION_FAILED,
  DELETE_REGISTRATION_REQUEST,
  DELETE_REGISTRATION_SUCCESS,
  DELETE_REGISTRATION_FAILED,
  SET_REGISTRATIONS_PAGER,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  registrations: [],
  registration: {},
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_REGISTRATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        registrations: payload,
        errors: null
      };
    case FETCH_REGISTRATIONS_FAILED:
      return {
        ...state,
        loading: false,
        registrations: [],
        errors: payload,
        success: null
      };
        case FETCH_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registration: payload,
        errors: null
      };
    case FETCH_REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        registration: {},
        errors: payload,
        success: null
      };
    case ADD_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registrations: [...state.registrations, payload],
        errors: null,
        success: {
          status: true,
          message: 'Added Successful !!'
        }
      };
    case ADD_REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        registrations: [],
        errors: payload.errors,
        success: null
      };
    case UPDATE_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REGISTRATION_SUCCESS:
      let updatedData = state.registrations.map(registration => {
        if(registration.id === payload.id) {
          return payload.registration;
        } else {
          return registration;
        }
      });

      return {
        ...state,
        loading: false,
        registrations: updatedData,
        errors: null,
        success: {
          status: true,
          message: 'Updated Successful !!'
        }
      };
    case UPDATE_REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        registrations: [],
        errors: payload,
        success: null
      };
    case DELETE_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registrations: state.registrations.filter(registration => registration.id !== payload),
        errors: null,
        success: {
          status: true,
          message: 'Deleted Successful !!'
        }
      };
    case DELETE_REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        registrations: [],
        errors: payload,
        success: null
      };
    case SET_REGISTRATIONS_PAGER:
      return {
        ...state,
        pager: payload
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
  