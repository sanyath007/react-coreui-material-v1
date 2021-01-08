import {
  FETCH_DEPTS_REQUEST,
  FETCH_DEPTS_SUCCESS,
  FETCH_DEPTS_FAILED,
  FETCH_DEPT_REQUEST,
  FETCH_DEPT_SUCCESS,
  FETCH_DEPT_FAILED,
  ADD_DEPTS_REQUEST,
  ADD_DEPTS_SUCCESS,
  ADD_DEPTS_FAILED,
  UPDATE_DEPTS_REQUEST,
  UPDATE_DEPTS_SUCCESS,
  UPDATE_DEPTS_FAILED,
  DELETE_DEPTS_REQUEST,
  DELETE_DEPTS_SUCCESS,
  DELETE_DEPTS_FAILED,
  SET_DEPTS_PAGER,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  depts: [],
  dept: {},
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DEPTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        depts: payload,
        errors: null
      };
    case FETCH_DEPTS_FAILED:
      return {
        ...state,
        loading: false,
        depts: [],
        errors: payload,
        success: null
      };
        case FETCH_DEPT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DEPT_SUCCESS:
      return {
        ...state,
        loading: false,
        dept: payload,
        errors: null
      };
    case FETCH_DEPT_FAILED:
      return {
        ...state,
        loading: false,
        dept: {},
        errors: payload,
        success: null
      };
    case ADD_DEPTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_DEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        depts: [...state.depts, payload],
        errors: null,
        success: {
          status: true,
          message: 'Added Successful !!'
        }
      };
    case ADD_DEPTS_FAILED:
      return {
        ...state,
        loading: false,
        depts: [],
        errors: payload.errors,
        success: null
      };
    case UPDATE_DEPTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DEPTS_SUCCESS:
      let updatedData = state.depts.map(dept => {
        if(dept.dept.depart_id === payload.id) {
          return payload.dept;
        } else {
          return dept;
        }
      });

      return {
        ...state,
        loading: false,
        depts: updatedData,
        errors: null,
        success: {
          status: true,
          message: 'Updated Successful !!'
        }
      };
    case UPDATE_DEPTS_FAILED:
      return {
        ...state,
        loading: false,
        depts: [],
        errors: payload,
        success: null
      };
    case DELETE_DEPTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        depts: state.depts.filter(dept => dept.depart_id !== payload),
        errors: null,
        success: {
          status: true,
          message: 'Deleted Successful !!'
        }
      };
    case DELETE_DEPTS_FAILED:
      return {
        ...state,
        loading: false,
        depts: [],
        errors: payload,
        success: null
      };
    case SET_DEPTS_PAGER:
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
  