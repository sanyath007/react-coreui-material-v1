import {
  FETCH_HOSPS_REQUEST,
  FETCH_HOSPS_SUCCESS,
  FETCH_HOSPS_FAILED,
  FETCH_PCUS_REQUEST,
  FETCH_PCUS_SUCCESS,
  FETCH_PCUS_FAILED
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  hosps: [],
  hosp: null,
  pcus: [],
  pcu: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_HOSPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOSPS_SUCCESS:
      return {
        ...state,
        loading: false,
        hosps: payload,
        errors: null
      };
    case FETCH_HOSPS_FAILED:
      return {
        ...state,
        loading: false,
        hosps: [],
        errors: payload,
        success: null
      };
    case FETCH_PCUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PCUS_SUCCESS:
      return {
        ...state,
        loading: false,
        pcus: payload,
        errors: null
      };
    case FETCH_PCUS_FAILED:
      return {
        ...state,
        loading: false,
        pcus: [],
        errors: payload,
        success: null
      };
    default: return state;
  }
}
  