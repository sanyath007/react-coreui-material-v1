import {
  FETCH_UNIT_SUCCESS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_REQUEST,
  FETCH_UNITS_FAILED
} from './types';

const initialState = {
  loading: false,
  success: null,
  errors: null,
  units: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload
      }
    case FETCH_UNITS_FAILED:
      return {
        ...state,
        loading: false,
        units: [],
        errors: action.payload
      };
    default: return state;
  }
}
