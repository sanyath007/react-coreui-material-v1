import axios from 'axios';
import {
  FETCH_HOSPS_REQUEST,
  FETCH_HOSPS_SUCCESS,
  FETCH_HOSPS_FAILED,
  FETCH_PCUS_REQUEST,
  FETCH_PCUS_SUCCESS,
  FETCH_PCUS_FAILED
} from './types';

export const fetchHosps = () => dispatch => {
  dispatch({ type: FETCH_HOSPS_REQUEST });
  
  axios.get('/api/imc/hosps')
    .then(res => {
      console.log(res.data);
      
      dispatch({ type: FETCH_HOSPS_SUCCESS, payload: res.data.hosps });      
    })
    .catch(err => {
      console.log(err.response);
    })
}

export const fetchPcus = () => dispatch => {
  dispatch({ type: FETCH_PCUS_REQUEST });
  
  axios.get('/api/imc/pcus')
    .then(res => {
      console.log(res.data);
      
      dispatch({ type: FETCH_PCUS_SUCCESS, payload: res.data.pcus });      
    })
    .catch(err => {
      console.log(err.response);
    })
}
