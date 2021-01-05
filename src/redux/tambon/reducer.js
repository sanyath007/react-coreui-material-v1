import {
  FETCH_TAMBON_SUCCESS
} from './types';

const initialState = {
  tambons: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TAMBON_SUCCESS:
      return {
        ...state,
        tambons: action.payload
      };
    default: return state;
  }
}
