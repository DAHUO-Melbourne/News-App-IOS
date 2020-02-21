import * as constants from './constants';
import {fromJS} from 'immutable';
const defaultState = fromJS({
  title: 'loading',
  content: '<p>loading</p>',
  date: '',
  id: '',
  bar: 'none',
  font: 17,
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.UPDATE_FONT_SIZE:
      return state.set('font', action.font);
    case constants.UPDATE_DETAILS_DATA:
      return state.merge({
        title: action.title,
        content: action.content,
        date: action.date,
      });
    case constants.UPDATE_NEWS_ID:
      return state.set('id', action.data);
    default:
      return state;
  }
};
