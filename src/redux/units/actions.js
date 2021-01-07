import axios from 'axios';
import {
  FETCH_UNIT_SUCCESS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_REQUEST,
  FETCH_UNITS_FAILED
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchUnits = () => dispatch => {
  dispatch({ type: FETCH_UNITS_REQUEST });

  axios.get(`${url}/units`)
    .then(res => {
      dispatch({
        type: FETCH_UNITS_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_UNITS_FAILED });
    });
}

