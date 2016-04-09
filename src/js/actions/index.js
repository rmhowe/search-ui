import fetch from 'isomorphic-fetch';

import {
  SET_FILTER,
  REQUEST_DATA,
  RECEIVE_DATA
} from '../constants';

export function setFilter(filter, value) {
  return {
    type: SET_FILTER,
    payload: {
      filter,
      value
    }
  };
}

export function requestData() {
  return {
    type: REQUEST_DATA,
    payload: {}
  };
}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    payload: {
      data
    }
  };
}

export function fetchData(url) {
  return (dispatch) => {
    dispatch(requestData());
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        dispatch(receiveData(data));
      });
  };
}
