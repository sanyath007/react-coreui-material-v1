import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_PERSONS_REQUEST,
  FETCH_PERSONS_SUCCESS,
  FETCH_PERSONS_FAILED,
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_FAILED,
  ADD_PERSONS_REQUEST,
  ADD_PERSONS_SUCCESS,
  ADD_PERSONS_FAILED,
  UPDATE_PERSONS_REQUEST,
  UPDATE_PERSONS_SUCCESS,
  UPDATE_PERSONS_FAILED,
  DELETE_PERSONS_REQUEST,
  DELETE_PERSONS_SUCCESS,
  DELETE_PERSONS_FAILED,
  SET_PERSONS_PAGER,
  HIDE_ALERT
} from './types';

const url = 'http://localhost/public_html/slim3-material-api/public';

export const fetchPersonsWithPagination = link => dispatch => {
  let apiEnpoint = link || `${url}/persons`;

  dispatch({ type: FETCH_PERSONS_REQUEST });

  axios.get(apiEnpoint)
  .then(res => {     
    dispatch({ type: FETCH_PERSONS_SUCCESS, payload: res.data.items });
    dispatch({ type: SET_PERSONS_PAGER, payload: res.data.pager });      
  })
  .catch(err => {
    // toast.error('Error !!');

    dispatch({ type: FETCH_PERSONS_FAILED, payload: err });
  });
}

export const fetchPersons = () => dispatch => {
  dispatch({ type: FETCH_PERSONS_REQUEST });

  axios.get(`${url}/persons`)
  .then(res => {     
    dispatch({ type: FETCH_PERSONS_SUCCESS, payload: res.data.items });
  })
  .catch(err => {
    // toast.error('Error !!');

    dispatch({ type: FETCH_PERSONS_FAILED, payload: err });
  });
}

export const fetchPerson = id => dispatch => {
  dispatch({ type: FETCH_PERSON_REQUEST });

  axios.get(`${url}/persons/${id}`)
  .then(res => {     
    dispatch({ type: FETCH_PERSON_SUCCESS, payload: res.data });
  })
  .catch(err => {
    // toast.error('Error !!');

    dispatch({ type: FETCH_PERSON_FAILED, payload: err });
  });
}

export const addPerson = data => dispatch => {
  dispatch({ type: ADD_PERSONS_REQUEST });

  const formData = new FormData();

  Object.keys(data).map(key => {
    formData.append(key, data[key]);
  })

  // data.attachments.forEach(file => {
  //   formData.append('attachments[]', file, file.name);
  // });
  
  axios.post(`${url}/persons`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    // toast.success('Successful !!');

    dispatch({ type: ADD_PERSONS_SUCCESS, payload: res.data });
  }).then(() => {
    dispatch(fetchPersons());
  }).catch(err => {
    // toast.error('Error !!');

    dispatch({ type: ADD_PERSONS_FAILED, payload: err.response.data });
  });
}

export const updatePerson = (id, data, history) => dispatch => {
  dispatch({ type: UPDATE_PERSONS_REQUEST });

  axios.put(`${url}/persons/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // toast.success('Successful !!');
    const { created_at, updated_at, ...updatedData } = res.data;

    dispatch({
      type: UPDATE_PERSONS_SUCCESS,
      payload: {
        id: id,
        person: updatedData
      }
    });
  }).then(() => {
    // history.push('/visitions');
  }).catch(err => {
    // toast.error('Error !!');

    dispatch({ type: UPDATE_PERSONS_FAILED });
  });
}

export const deletePerson = id => dispatch => {
  dispatch({ type: DELETE_PERSONS_REQUEST });

  axios.delete(`${url}/persons/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // toast.success('Successful !!');
    dispatch({
      type: DELETE_PERSONS_SUCCESS,
      payload: id
    })
  }).then(() => {
      dispatch(fetchPersons());
  }).catch(err => {
    // toast.error('Error !!');

    dispatch({ 
      type: DELETE_PERSONS_FAILED,
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
