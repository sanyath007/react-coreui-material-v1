import axios from 'axios';
import {
  FETCH_ITEM_GROUPS_REQUEST,
  FETCH_ITEM_GROUPS_FAILED,
  FETCH_ITEM_GROUPS_SUCCESS,
  FETCH_ITEM_GROUP_REQUEST,
  FETCH_ITEM_GROUP_FAILED,
  FETCH_ITEM_GROUP_SUCCESS,
  SET_ITEM_GROUPS_PAGER
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchItemGroupsWithPagination = () => dispatch => {
  dispatch({ type: FETCH_ITEM_GROUPS_REQUEST });

  axios.get(`${url}/item-groups`)
    .then(res => {
      dispatch({ type: FETCH_ITEM_GROUPS_SUCCESS, payload: res.data.groups });
      dispatch({ type: SET_ITEM_GROUPS_PAGER, payload: res.data.pager });
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_ITEM_GROUPS_FAILED, payload: err });
    });
}

export const fetchItemGroups = () => dispatch => {
  dispatch({ type: FETCH_ITEM_GROUPS_REQUEST });

  axios.get(`${url}/item-groups`)
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_ITEM_GROUPS_SUCCESS, payload: res.data.groups });
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_ITEM_GROUPS_FAILED, payload: err });
    });
}

export const fetchItemGroup = id => dispatch => {
  dispatch({ type: FETCH_ITEM_GROUP_REQUEST });

  axios.get(`${url}/item-groups/${id}`)
    .then(res => {
      dispatch({ type: FETCH_ITEM_GROUP_SUCCESS, payload: res.data.group });
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_ITEM_GROUP_FAILED, payload: err });
    });
}
