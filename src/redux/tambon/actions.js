import axios from 'axios';
import {
  FETCH_TAMBON_SUCCESS
} from './types';

export const fetchTambons = () => dispatch => {
  axios.get(`/api/imc/tambons`)
    .then(res => {
      dispatch({
        type: FETCH_TAMBON_SUCCESS,
        payload: res.data.tambons
      })
    })
    .catch(err => console.log(err));
}
