import axios from 'axios';
import {
  FETCH_ICD10S_REQUEST,
  FETCH_ICD10S_SUCCESS,
  FETCH_ICD10S_FAILED,
  SET_ICD10S_PAGER
} from './types';

export const fetchIcd10s = link => dispatch => {
  let apiEnpoint = link || `/api/imc/icd10s`;

  dispatch({ type: FETCH_ICD10S_REQUEST });
  
  axios.get(apiEnpoint)
    .then(res => {      
      dispatch({ type: FETCH_ICD10S_SUCCESS, payload: res.data.icd10s.data });
      dispatch({ type: SET_ICD10S_PAGER, payload: res.data.icd10s });      
    })
    .catch(err => {
      console.log(err.response);
    })
}