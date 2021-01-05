import axios from 'axios';
import {
  FETCH_CHANGWAT_SUCCESS
} from './types';

export const fetchChangwats = () => dispatch => {
  axios.get(`/api/imc/changwats`)
    .then(res => {
      dispatch({
        type: FETCH_CHANGWAT_SUCCESS,
        payload: res.data.changwats
      })
    })
    .catch(err => console.log(err));
}
