import { combineReducers } from 'redux';
import Immutable from 'immutable';

import {
  SET_FILTER,
  SET_GENDER_FILTER,
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

const rootReducer = combineReducers({
  activeFilters,
  artists
});
export default rootReducer;
