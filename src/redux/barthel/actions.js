import axios from 'axios';
import {
  FETCH_BARTHELS_REQUEST,
  FETCH_BARTHELS_SUCCESS,
  FETCH_BARTHELS_FAILED,
  ADD_BARTHELS_REQUEST,
  ADD_BARTHELS_SUCCESS,
  ADD_BARTHELS_FAILED,
  SET_BARTHELS_PAGER
} from './types';

export const fetchBarthels = pid => dispatch => {
  dispatch({ type: FETCH_BARTHELS_REQUEST });

  axios.get(`/api/imc/barthels/${pid}`)
    .then(res => {
      dispatch({ type: FETCH_BARTHELS_SUCCESS, payload: res.data });
      // dispatch({ type: SET_BARTHELS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_BARTHELS_FAILED, payload: err });
    });
}

export const addBarthel = data => dispatch => {
  dispatch({ type: ADD_BARTHELS_REQUEST });
  
  axios.post('/api/imc/barthels', data)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_BARTHELS_SUCCESS, payload: res.data });
    }).then(() => {

    }).catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_BARTHELS_FAILED });
    });
}
