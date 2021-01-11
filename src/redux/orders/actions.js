import axios from 'axios';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILED,
  FETCH_LASTORDERNO_SUCCESS,
  ADD_ORDERS_REQUEST,
  ADD_ORDERS_SUCCESS,
  ADD_ORDERS_FAILED,
  SET_ORDERS_PAGER
} from './types';
import { toast } from 'react-toastify';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchOrdersWithPagination = pid => dispatch => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  axios.get(`${url}/orders`)
    .then(res => {
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: res.data.items });
      dispatch({ type: SET_ORDERS_PAGER, payload: res.data.pager });      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_ORDERS_FAILED, payload: err });
    });
}

export const fetchOrders = pid => dispatch => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  axios.get(`${url}/orders`)
    .then(res => {
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: res.data.items });    
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_ORDERS_FAILED, payload: err });
    });
}

export const fetchOrder = pid => dispatch => {
  dispatch({ type: FETCH_ORDER_REQUEST });

  axios.get(`${url}/orders`)
    .then(res => {
      dispatch({ type: FETCH_ORDER_SUCCESS, payload: res.data.items });      
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_ORDER_FAILED, payload: err });
    });
}

export const fetchLastOrderNo = pid => dispatch => {
  axios.get(`${url}/orders/last/order-no`)
    .then(res => {
      dispatch({ type: FETCH_LASTORDERNO_SUCCESS, payload: res.data });      
    })
    .catch(err => {
      console.log(err);
    });
}

export const addOrder = data => dispatch => {
  dispatch({ type: ADD_ORDERS_REQUEST });
  console.log(data);

  axios.post(`${url}/orders`, data)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_ORDERS_SUCCESS, payload: res.data });

      toast.success('Successful !!');
    }).then(() => {
      dispatch(fetchLastOrderNo());
    }).catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_ORDERS_FAILED });

      toast.error('Insert Data Failure !!');
    });
}

export const deleteOrder = data => dispatch => {

}
