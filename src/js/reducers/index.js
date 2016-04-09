import { combineReducers } from 'redux';
import Immutable from 'immutable';

import {
  SET_FILTER,
  RECEIVE_DATA
} from '../constants';

function activeFilters(state = Immutable.Map({
  age: Immutable.List(),
  rate: Immutable.List(),
  gender: Immutable.List()
}), action) {
  switch (action.type) {
    case SET_FILTER:
      return state.set(action.payload.filter, action.payload.value);
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
