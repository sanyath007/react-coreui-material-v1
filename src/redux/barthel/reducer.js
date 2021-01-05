import {
  FETCH_BARTHELS_REQUEST,
  FETCH_BARTHELS_SUCCESS,
  FETCH_BARTHELS_FAILED,
  ADD_BARTHELS_REQUEST,
  ADD_BARTHELS_SUCCESS,
  ADD_BARTHELS_FAILED,
  SET_BARTHELS_PAGER
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  barthels: [],
  barthel: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BARTHELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BARTHELS_SUCCESS:
      return {
        ...state,
        loading: false,
        barthels: payload,
        errors: null
      };
    case FETCH_BARTHELS_FAILED:
      return {
        ...state,
        loading: false,
        barthels: [],
        errors: payload,
        success: null
      };
    case ADD_BARTHELS_SUCCESS:
      return {
        ...state,
        loading: false,
        barthels: [...state.barthels, payload],
        errors: null
      };
    default: return state;
  }
}
