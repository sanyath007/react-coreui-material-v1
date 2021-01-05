import {
  FETCH_ICD10S_REQUEST,
  FETCH_ICD10S_SUCCESS,
  FETCH_ICD10S_FAILED,
  SET_ICD10S_PAGER
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  icd10s: [],
  icd10: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ICD10S_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ICD10S_SUCCESS:
      return {
        ...state,
        loading: false,
        icd10s: payload,
        errors: null
      };
    case FETCH_ICD10S_FAILED:
      return {
        ...state,
        loading: false,
        icd10s: [],
        errors: payload,
        success: null
      };
    case SET_ICD10S_PAGER:
      return {
        ...state,
        pager: payload
      };
    default: return state;
  }
}
  