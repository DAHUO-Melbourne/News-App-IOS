import * as listConstants from './constants';
import {fromJS, List} from 'immutable';
const defaultState = fromJS({
  news: List(),
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case listConstants.INIT_LIST_DATA:
      return state.set('news', action.data);
    default:
      return state;
  }
};
