import axios from 'axios';
import {
  FETCH_AMPHUR_SUCCESS
} from './types';

export const fetchAmphurs = () => dispatch => {
  axios.get(`/api/imc/amphurs`)
    .then(res => {
      dispatch({
        type: FETCH_AMPHUR_SUCCESS,
        payload: res.data.amphurs
      })
    })
    .catch(err => console.log(err));
}

