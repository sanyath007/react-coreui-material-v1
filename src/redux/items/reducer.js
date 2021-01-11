import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_FAILED,
  FETCH_ITEM_SUCCESS,
  SET_ITEMS_PAGER,
  ADD_ITEMS_REQUEST,
  ADD_ITEMS_FAILED,
  ADD_ITEMS_SUCCESS,
  UPDATE_ITEMS_REQUEST,
  UPDATE_ITEMS_FAILED,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_FAILED,
  DELETE_ITEM_SUCCESS,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  success: null,
  errors: null,
  item: null,
  items: [],
  pager: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        items: [],
        errors: action.payload
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        errors: ''
      };
    case FETCH_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
        };
    case FETCH_ITEM_FAILED:
        return {
          ...state,
          loading: false,
          items: [],
          errors: action.payload
        };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        errors: ''
      };
    case SET_ITEMS_PAGER:
      return {
        ...state,
        pager: action.payload
      };
    case ADD_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_ITEMS_FAILED:
        return {
          ...state,
          loading: false,
          items: [],
          errors: action.payload
        };
    case ADD_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        errors: ''
      };
    default: return state;
  }
}
