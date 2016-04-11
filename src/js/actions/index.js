import fetch from 'isomorphic-fetch';

import {
  SET_SMALL_BROWSER_MODE,
  SET_FILTER,
  SET_GENDER_FILTER,
  SET_ORDER_BY,
  TOGGLE_MAP,
  REQUEST_DATA,
  RECEIVE_DATA
} from '../constants';

export function setSmallBrowserMode(active) {
  return {
    type: SET_SMALL_BROWSER_MODE,
    payload: {
      active
    }
  };
}

export function setFilter(filter, value) {
  return {
    type: SET_FILTER,
    payload: {
      filter,
      value
    }
  };
}

export function setGenderFilter(gender, value) {
  return {
    type: SET_GENDER_FILTER,
    payload: {
      gender,
      value
    }
  };
}

export function setOrderBy(value, ascending) {
  return {
    type: SET_ORDER_BY,
    payload: {
      value,
      ascending
    }
  };
}

export function toggleMap() {
  return {
    type: TOGGLE_MAP,
    payload: {}
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
