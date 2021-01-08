import {
  FETCH_PERSONS_REQUEST,
  FETCH_PERSONS_SUCCESS,
  FETCH_PERSONS_FAILED,
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILED,
  ADD_PERSONS_REQUEST,
  ADD_PERSONS_SUCCESS,
  ADD_PERSONS_FAILED,
  UPDATE_PERSONS_REQUEST,
  UPDATE_PERSONS_SUCCESS,
  UPDATE_PERSONS_FAILED,
  DELETE_PERSONS_REQUEST,
  DELETE_PERSONS_SUCCESS,
  DELETE_PERSONS_FAILED,
  SET_PERSONS_PAGER,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  persons: [],
  person: {},
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PERSONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
        case FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        persons: payload,
        errors: null
      };
    case FETCH_PERSONS_FAILED:
      return {
        ...state,
        loading: false,
        persons: [],
        errors: payload,
        success: null
      };
    case SET_PERSONS_PAGER:
      return {
        ...state,
        pager: payload
      };
    case FETCH_PERSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
        case FETCH_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        person: payload,
        errors: null
      };
    case FETCH_PERSON_FAILED:
      return {
        ...state,
        loading: false,
        person: null,
        errors: payload,
        success: null
      };
    case ADD_PERSONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PERSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        persons: [...state.persons, payload],
        errors: null
      };
    case ADD_PERSONS_FAILED:
      return {
        ...state,
        loading: false,
        person: {},
        errors: payload,
        success: null
      };
    case FETCH_PERSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        person: payload,
        errors: null
      };
    case FETCH_PERSON_FAILED:
      return {
        ...state,
        loading: false,
        person: {},
        errors: payload,
        success: null
      };
    case UPDATE_PERSONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PERSONS_SUCCESS:
      let updatedData = state.persons.map(person => {
        if(person.person_id === payload.id) {
          return payload.person;
        } else {
          return person;
        }
      });

      return {
        ...state,
        loading: false,
        persons: updatedData,
        errors: null,
        success: {
          status: true,
          message: 'Updated Successful !!'
        }
      };
    case UPDATE_PERSONS_FAILED:
      return {
        ...state,
        loading: false,
        persons: [],
        errors: payload,
        success: null
      };
    case DELETE_PERSONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PERSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        persons: state.persons.filter(person => person.person_id !== payload),
        errors: null,
        success: {
          status: true,
          message: 'Deleted Successful !!'
        }
      };
    case DELETE_PERSONS_FAILED:
      return {
        ...state,
        loading: false,
        persons: [],
        errors: payload,
        success: null
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
