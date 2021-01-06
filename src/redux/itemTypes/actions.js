import axios from 'axios';
import {
  FETCH_ITEM_TYPES_REQUEST,
  FETCH_ITEM_TYPES_SUCCESS,
  FETCH_ITEM_TYPES_FAILED
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchItemTypes = () => dispatch => {
  dispatch({ type: FETCH_ITEM_TYPES_REQUEST });

  axios.get(`${url}/item-types`)
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_ITEM_TYPES_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: FETCH_ITEM_TYPES_FAILED,
        payload: err
      });
    });
}
