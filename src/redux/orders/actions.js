import axios from 'axios';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  ADD_ORDERS_SUCCESS,
  SET_ORDERS_PAGER
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchOrders = pid => dispatch => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  axios.get(`${url}/orders`)
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: res.data.items });
      dispatch({ type: SET_ORDERS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_ORDERS_FAILED, payload: err });
    });
}

export const addOrder = data => dispatch => {
  dispatch({ type: FETCH_ORDERS_REQUEST });
  
  axios.post(`${url}/orders`, data)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_ORDERS_SUCCESS, payload: res.data });
    }).then(() => {

    }).catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_ORDERS_FAILED });
    });
}

export const deleteOrder = data => dispatch => {

}
