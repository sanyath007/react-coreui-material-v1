import {
  ITEMS_REQUEST,
  ITEMS_FAILED,
  SET_ITEMS_PAGER,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
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
    case ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ITEMS_FAILED:
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
    default: return state;
  }
}
