import axios from 'axios';
// import { toast } from 'react-toastify';
import {
  FETCH_DEPTS_REQUEST,
  FETCH_DEPTS_SUCCESS,
  FETCH_DEPTS_FAILED,
  FETCH_DEPT_REQUEST,
  FETCH_DEPT_SUCCESS,
  FETCH_DEPT_FAILED,
  ADD_DEPTS_REQUEST,
  ADD_DEPTS_SUCCESS,
  ADD_DEPTS_FAILED,
  UPDATE_DEPTS_REQUEST,
  UPDATE_DEPTS_SUCCESS,
  UPDATE_DEPTS_FAILED,
  DELETE_DEPTS_REQUEST,
  DELETE_DEPTS_SUCCESS,
  DELETE_DEPTS_FAILED,
  SET_DEPTS_PAGER,
  HIDE_ALERT
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchDeptsWithPagination = link => dispatch => {
  let apiEnpoint = link || `${url}/depts`;

  dispatch({ type: FETCH_DEPTS_REQUEST });
  
  axios.get(apiEnpoint)
  .then(res => {
    console.log(res.data);    
    dispatch({ type: FETCH_DEPTS_SUCCESS, payload: res.data.items });
    dispatch({ type: SET_DEPTS_PAGER, payload: res.data.pager });      
  })
  .catch(err => {
    // toast.error('Error !!');    
    console.log(err.response);
    dispatch({ type: FETCH_DEPTS_FAILED, payload: err });
  });
}

export const fetchDepts = () => dispatch => {
  dispatch({ type: FETCH_DEPTS_REQUEST });
  
  axios.get(`${url}/depts`)
  .then(res => {
    console.log(res.data);    
    dispatch({ type: FETCH_DEPTS_SUCCESS, payload: res.data.items }); 
  })
  .catch(err => {
    // toast.error('Error !!');
    
    console.log(err.response);
    dispatch({ type: FETCH_DEPTS_FAILED, payload: err });
  });
}

export const fetchDept = id => dispatch => {
  dispatch({ type: FETCH_DEPT_REQUEST });
  
  axios.get(`${url}/depts/${id}`)
  .then(res => {
    console.log(res);
    dispatch({ type: FETCH_DEPT_SUCCESS, payload: res.data });      
  })
  .catch(err => {
    // toast.error('Error !!');

    dispatch({ type: FETCH_DEPT_FAILED, payload: err });
  })
}

export const addDept = data => dispatch => {
  dispatch({ type: ADD_DEPTS_REQUEST });

  console.log(data)
  axios.post(`${url}/depts`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // toast.success('Successful !!');
    console.log(res.data)
    dispatch({
      type: ADD_DEPTS_SUCCESS,
      payload: res.data
    });
  }).then(() => {
    dispatch(fetchDepts());
  }).catch(err => {
    // toast.error('Error !!');
    
    dispatch({ type: ADD_DEPTS_FAILED, payload: err.response.data });
  })
}

export const updateDept = (id, data, history) => dispatch => {
  dispatch({ type: UPDATE_DEPTS_REQUEST });

  axios.put(`${url}/depts/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // toast.success('Successful !!');

    const { created_at, updated_at, ...updatedData } = res.data;

    dispatch({
      type: UPDATE_DEPTS_SUCCESS,
      payload: {
        id: id,
        registration: updatedData
      }
    });
  }).then(() => {
    // history.push('/registrations');
  }).catch(err => {
    // toast.error('Error !!');

    dispatch({
      type: UPDATE_DEPTS_FAILED,
      payload: {}
    });
  });
}

export const deleteDept = id => dispatch => {
  dispatch({ type: DELETE_DEPTS_REQUEST });

  axios.delete(`${url}/depts/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // toast.success('Successful !!');

    dispatch({
      type: DELETE_DEPTS_SUCCESS,
      payload: id
    })
  }).then(() => {
      dispatch(fetchDepts());
  }).catch(err => {
    // toast.error('Error !!');

    dispatch({ 
      type: DELETE_DEPTS_FAILED,
      payload: {
        status: err.response.status,
        message: err.response.data.message
      }
    });
  });
}

export const hideAlert = () => dispatch => {
  dispatch({ type: HIDE_ALERT })
}