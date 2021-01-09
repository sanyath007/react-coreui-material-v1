import axios from 'axios';
import {
  ITEMS_REQUEST,
  ITEMS_FAILED,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEMS_SUCCESS,
  SET_ITEMS_PAGER,
  ADD_ITEM_SUCCESS,
  HIDE_ALERT
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchItems = link => dispatch => {
  let endpoint = link ? link : `${url}/items`;

  dispatch({ type: ITEMS_REQUEST });

  axios.get(endpoint)
    .then(res => {
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: res.data.items });
      dispatch({ type: SET_ITEMS_PAGER, payload: res.data.pager });
    })
    .catch(err => {
      dispatch({
        type: ITEMS_FAILED,
        payload: err 
      })
    });
}

export const fetchItem = itemId => dispatch => {
  dispatch({ type: ITEMS_REQUEST });

  axios.get(`${url}/items/${itemId}`)
    .then(res => {
      dispatch({ type: FETCH_ITEM_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: ITEMS_FAILED,
        payload: err 
      })
    });
}

export const addItem = () => dispatch => {
  dispatch({ type: ITEMS_REQUEST });

  let item = {};

  axios.post(`${url}/items`, item, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
  }).then(() => {
    dispatch(fetchItems());
  }).catch(err => {
    dispatch({
      type: ITEMS_FAILED,
      payload: err
    });
  })
}

export const updateItem = () => dispatch => {
  
}

export const deleteItem = () => dispatch => {

}

export const hideAlert = () => dispatch => {
  dispatch({ type: HIDE_ALERT })
}