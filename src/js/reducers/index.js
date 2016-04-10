import { combineReducers } from 'redux';
import Immutable from 'immutable';

import {
  SET_FILTER,
  SET_GENDER_FILTER,
  TOGGLE_MAP,
  RECEIVE_DATA
} from '../constants';

function activeFilters(state = Immutable.fromJS({
  age: [],
  rate: [],
  gender: {
    M: true,
    F: true
  }
}), action) {
  switch (action.type) {
    case SET_FILTER:
      return state.set(action.payload.filter, action.payload.value);
    case SET_GENDER_FILTER:
      return state.setIn(['gender', action.payload.gender], action.payload.value);
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
  activeFilters,
  artists,
  showMap
});
export default rootReducer;
