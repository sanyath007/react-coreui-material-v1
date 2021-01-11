import {
  FETCH_ITEM_GROUPS_REQUEST,
  FETCH_ITEM_GROUPS_FAILED,
  FETCH_ITEM_GROUPS_SUCCESS,
  FETCH_ITEM_GROUP_REQUEST,
  FETCH_ITEM_GROUP_FAILED,
  FETCH_ITEM_GROUP_SUCCESS,
  SET_ITEM_GROUPS_PAGER
} from './types';

const initialState = {
  loading: false,
  success: null,
  errors: null,
  itemGroup: null,
  itemGroups: [],
  pager: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEM_GROUPS_FAILED:
      return {
        ...state,
        loading: false,
        itemGroups: [],
        errors: action.payload
      };
    case FETCH_ITEM_GROUPS_SUCCESS:
      return {
        ...state,
        itemGroups: action.payload,
        errors: ''
      }
    case FETCH_ITEM_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEM_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        itemGroup: null,
        errors: action.payload
      };
    case FETCH_ITEM_GROUP_SUCCESS:
      return {
        ...state,
        itemGroup: action.payload,
        errors: ''
      }
    case SET_ITEM_GROUPS_PAGER:
      return {
        ...state,
        pager: action.payload
      };
    default: return state;
  }
}
