import {
  FETCH_AMPHUR_SUCCESS
} from './types';

const initialState = {
  amphurs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AMPHUR_SUCCESS:
      return {
        ...state,
        amphurs: action.payload
      }
    default: return state;
  }
}
