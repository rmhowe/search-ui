import { combineReducers } from 'redux';
import Immutable from 'immutable';

import {
  SET_FILTER,
  SET_GENDER_FILTER,
  SET_ORDER_BY,
  TOGGLE_MAP,
  RECEIVE_DATA
} from '../constants';

function searchModifiers(state = Immutable.fromJS({
  filters: {
    age: [],
    rate: [],
    gender: {
      M: true,
      F: true
    }
  },
  orderBy: {
    value: null,
    ascending: false
  }
}), action) {
  switch (action.type) {
    case SET_FILTER:
    case SET_GENDER_FILTER:
      return state.set('filters', filters(state.get('filters'), action));
    case SET_ORDER_BY:
      return state.set('orderBy', orderBy(state.get('orderBy'), action));
    default:
      return state;
  }
}

function filters(state, action) {
  switch (action.type) {
    case SET_FILTER:
      return state.set(action.payload.filter, action.payload.value);
    case SET_GENDER_FILTER:
      return state.setIn(['gender', action.payload.gender], action.payload.value);
    default:
      return state;
  }
}

function orderBy(state, action) {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({
        value: action.payload.value,
        ascending: action.payload.ascending
      });
    default:
      return state;
  }
}

function artists(state = Immutable.List(), action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return Immutable.fromJS(action.payload.data.artists);
    default:
      return state;
  }
}

function showMap(state = true, action) {
  switch (action.type) {
    case TOGGLE_MAP:
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  searchModifiers,
  artists,
  showMap
});
export default rootReducer;
