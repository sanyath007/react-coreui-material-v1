import axios from 'axios';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_FAILED,
  FETCH_ITEM_SUCCESS,
  SET_ITEMS_PAGER,
  ADD_ITEMS_REQUEST,
  ADD_ITEMS_FAILED,
  ADD_ITEMS_SUCCESS,
  UPDATE_ITEMS_REQUEST,
  UPDATE_ITEMS_FAILED,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEMS_REQUEST,
  DELETE_ITEMS_FAILED,
  DELETE_ITEM_SUCCESS,
  HIDE_ALERT
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchItemsWithPagination = link => dispatch => {
  let endpoint = link ? link : `${url}/items?page=1`;

  dispatch({ type: FETCH_ITEMS_REQUEST });

  axios.get(endpoint)
    .then(res => {
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: res.data.items });
      dispatch({ type: SET_ITEMS_PAGER, payload: res.data.pager });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ITEMS_FAILED,
        payload: err 
      })
    });
}

export const fetchItems = link => dispatch => {
  dispatch({ type: FETCH_ITEMS_REQUEST });

  axios.get(`${url}/items`)
    .then(res => {
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: res.data.items });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ITEMS_FAILED,
        payload: err 
      })
    });
}

export const fetchItem = itemId => dispatch => {
  dispatch({ type: FETCH_ITEM_REQUEST });

  axios.get(`${url}/items/${itemId}`)
    .then(res => {
      dispatch({ type: FETCH_ITEM_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ITEM_FAILED,
        payload: err 
      })
    });
}

export const addItem = () => dispatch => {
  dispatch({ type: ADD_ITEMS_REQUEST });

  let item = {};

  axios.post(`${url}/items`, item, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
    dispatch({
      type: ADD_ITEMS_SUCCESS,
      payload: res.data
    })
  }).then(() => {
    dispatch(fetchItems());
  }).catch(err => {
    dispatch({
      type: ADD_ITEMS_FAILED,
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