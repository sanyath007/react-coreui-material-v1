import axios from 'axios';
import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILED,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILED,
  SET_ITEMS_PAGER,
  HIDE_ALERT
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchItems = link => dispatch => {
  let endpoint = link ? link : `${url}/items`;
  console.log(endpoint);

  dispatch({ type: FETCH_ITEM_REQUEST });

  axios.get(endpoint)
    .then(res => {
      const { items, pager } = res.data;

      dispatch({ type: FETCH_ITEM_SUCCESS, payload: items });
      dispatch({ type: SET_ITEMS_PAGER, payload: pager });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ITEM_FAILED,
        payload: err 
      })
    });
}

export const fetchItem = () => dispatch => {

}

export const addItem = () => dispatch => {
  dispatch({ type: ADD_ITEM_REQUEST });

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
      type: ADD_ITEM_FAILED,
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