import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILED,
  SET_ITEMS_PAGER,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILED,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILED,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  success: null,
  errors: null,
  items: [],
  item: null,
  pager: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEM_SUCCESS:
      return {
        loading: false,
        items: action.payload,
        errors: ''
      };
    case FETCH_ITEM_FAILED:
      return {
        loading: false,
        items: [],
        errors: action.payload
      };
    case SET_ITEMS_PAGER:
      return {
        ...state,
        pager: action.payload
      };
    default: return state;
  }
}
