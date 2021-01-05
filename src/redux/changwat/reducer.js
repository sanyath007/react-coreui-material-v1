import {
  FETCH_CHANGWAT_SUCCESS
} from './types';

const initialState = {
  changwats: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHANGWAT_SUCCESS:
      return {
        ...state,
        changwats: action.payload
      }
    default: return state;
  }
}
