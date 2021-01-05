import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_VISITIONS_REQUEST,
  FETCH_VISITIONS_SUCCESS,
  FETCH_VISITIONS_FAILED,
  FETCH_VISITION_REQUEST,
  FETCH_VISITION_SUCCESS,
  FETCH_VISITION_FAILED,
  ADD_VISITION_REQUEST,
  ADD_VISITION_SUCCESS,
  ADD_VISITION_FAILED,
  UPDATE_VISITION_REQUEST,
  UPDATE_VISITION_SUCCESS,
  UPDATE_VISITION_FAILED,
  DELETE_VISITION_REQUEST,
  DELETE_VISITION_SUCCESS,
  DELETE_VISITION_FAILED,
  SET_VISITIONS_PAGER,
  HIDE_ALERT
} from './types';

export const fetchVisitions = link => dispatch => {
  let apiEnpoint = link || `/api/imc/visitions`;

  dispatch({ type: FETCH_VISITIONS_REQUEST });

  axios.get(apiEnpoint)
  .then(res => {     
    dispatch({ type: FETCH_VISITIONS_SUCCESS, payload: res.data.pager.data });
    dispatch({ type: SET_VISITIONS_PAGER, payload: res.data.pager });      
  })
  .catch(err => {
    toast.error('Error !!');
  });
}

export const addVisition = data => dispatch => {
  dispatch({ type: ADD_VISITION_REQUEST });

  const formData = new FormData();

  Object.keys(data).map(key => {
    formData.append(key, data[key]);
  })

  data.attachments.forEach(file => {
    formData.append('attachments[]', file, file.name);
  });
  
  axios.post('/api/imc/visitions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    toast.success('Successful !!');

    dispatch({ type: ADD_VISITION_SUCCESS, payload: res.data });
  }).then(() => {
    dispatch(fetchVisitions());
  }).catch(err => {
    toast.error('Error !!');

    dispatch({ type: ADD_VISITION_FAILED, payload: err.response.data });
  });
}

export const fetchVisition = id => dispatch => {
  dispatch({ type: FETCH_VISITION_REQUEST });

  axios.get(`/api/imc/visitions/${id}`)
    .then(res => {
      dispatch({ type: FETCH_VISITION_SUCCESS, payload: res.data[0] });
    })
    .catch(err => {
      toast.error('Error !!');
    });
}

export const updateVisition = (id, data, history) => dispatch => {
  dispatch({ type: UPDATE_VISITION_REQUEST });

  axios.put(`/api/imc/visitions/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    toast.success('Successful !!');
    const { created_at, updated_at, ...updatedData } = res.data;

    dispatch({
      type: UPDATE_VISITION_SUCCESS,
      payload: {
        id: id,
        visition: updatedData
      }
    });
  }).then(() => {
    history.push('/visitions');
  }).catch(err => {
    toast.error('Error !!');

    dispatch({ type: UPDATE_VISITION_FAILED });
  });
}

export const deleteVisition = id => dispatch => {
  dispatch({ type: DELETE_VISITION_REQUEST });

  axios.delete(`/api/imc/visitions/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    toast.success('Successful !!');
    dispatch({
      type: DELETE_VISITION_SUCCESS,
      payload: id
    })
  }).then(() => {
      dispatch(fetchVisitions());
  }).catch(err => {
    toast.error('Error !!');

    dispatch({ 
      type: DELETE_VISITION_FAILED,
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
