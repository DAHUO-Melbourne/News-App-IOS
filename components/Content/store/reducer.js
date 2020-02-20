import {fromJS} from 'immutable';
const defaultState = fromJS({
  title: 'loading',
  content: '<p>loading</p>',
  date: '',
  id: '',
  bar: 'none',
  font: 10,
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DETAILS_DATA':
      return state.merge({
        title: action.title,
        content: action.content,
        date: action.date,
      });
    case 'UPDATE_NEWS_ID':
      return state.set('id', action.data);
    default:
      return state;
  }
};
