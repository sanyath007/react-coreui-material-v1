import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_SUCCESS,
  ADD_ORDERS_SUCCESS,
  SET_ORDERS_PAGER
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  orders: [],
  order: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        errors: null
      };
    case SET_ORDERS_PAGER:
      return {
        ...state,
        pager: payload
      };
    case FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        orders: [],
        errors: payload,
        success: null
      };
    case ADD_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, payload],
        errors: null
      };
    default: return state;
  }
}
