import {
  FETCH_ITEM_TYPES_REQUEST,
  FETCH_ITEM_TYPES_SUCCESS,
  FETCH_ITEM_TYPES_FAILED
} from './types';

const initialState = {
  itemTypes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_TYPES_SUCCESS:
      return {
        ...state,
        itemTypes: action.payload
      };
    default: return state;
  }
}
