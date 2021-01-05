import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_REGISTRATIONS_REQUEST,
  FETCH_REGISTRATIONS_SUCCESS,
  FETCH_REGISTRATIONS_FAILED,
  FETCH_REGISTRATION_REQUEST,
  FETCH_REGISTRATION_SUCCESS,
  FETCH_REGISTRATION_FAILED,
  ADD_REGISTRATION_REQUEST,
  ADD_REGISTRATION_SUCCESS,
  ADD_REGISTRATION_FAILED,
  UPDATE_REGISTRATION_REQUEST,
  UPDATE_REGISTRATION_SUCCESS,
  UPDATE_REGISTRATION_FAILED,
  DELETE_REGISTRATION_REQUEST,
  DELETE_REGISTRATION_SUCCESS,
  DELETE_REGISTRATION_FAILED,
  SET_REGISTRATIONS_PAGER,
  HIDE_ALERT
} from './types';

export const fetchRegistrations = link => dispatch => {
  let apiEnpoint = link || `/api/imc/registrations`;

  dispatch({ type: FETCH_REGISTRATIONS_REQUEST });
  
  axios.get(apiEnpoint)
  .then(res => {
    console.log(res.data);
    
    dispatch({ type: FETCH_REGISTRATIONS_SUCCESS, payload: res.data.pager.data });
    dispatch({ type: SET_REGISTRATIONS_PAGER, payload: res.data.pager });      
  })
  .catch(err => {
    toast.error('Error !!');
    
    console.log(err.response);
  });
}

export const addRegistration = data => dispatch => {
  dispatch({ type: FETCH_REGISTRATION_REQUEST });

  console.log(data)
  axios.post('/api/imc/registrations', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    toast.success('Successful !!');
    console.log(res.data)
    dispatch({
      type: ADD_REGISTRATION_SUCCESS,
      payload: res.data
    });
  }).then(() => {
    dispatch(fetchRegistrations());
  }).catch(err => {
    toast.error('Error !!');
    
    dispatch({ type: ADD_REGISTRATION_FAILED, payload: err.response.data });
  })
}

export const fetchRegistration = id => dispatch => {
  dispatch({ type: FETCH_REGISTRATION_REQUEST });
  
  axios.get(`/api/imc/registrations/${id}`)
  .then(res => {
    console.log(res.data[0]);
    dispatch({ type: FETCH_REGISTRATION_SUCCESS, payload: res.data[0] });      
  })
  .catch(err => {
    toast.error('Error !!');

    dispatch({ type: FETCH_REGISTRATION_FAILED });
  })
}

export const updateRegistration = (id, data, history) => dispatch => {
  dispatch({ type: UPDATE_REGISTRATION_REQUEST });

  axios.put(`/api/imc/registrations/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    toast.success('Successful !!');

    const { created_at, updated_at, ...updatedData } = res.data;

    dispatch({
      type: UPDATE_REGISTRATION_SUCCESS,
      payload: {
        id: id,
        registration: updatedData
      }
    });
  }).then(() => {
    history.push('/registrations');
  }).catch(err => {
    toast.error('Error !!');

    dispatch({
      type: UPDATE_REGISTRATION_FAILED,
      payload: {}
    });
  });
}

export const deleteRegistration = id => dispatch => {
  dispatch({ type: DELETE_REGISTRATION_REQUEST });

  axios.delete(`/api/imc/registrations/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    toast.success('Successful !!');

    dispatch({
      type: DELETE_REGISTRATION_SUCCESS,
      payload: id
    })
  }).then(() => {
      dispatch(fetchRegistrations());
  }).catch(err => {
    toast.error('Error !!');

    dispatch({ 
      type: DELETE_REGISTRATION_FAILED,
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