import {fromJS} from 'immutable';
const defaultState = fromJS({
  title: 'loading',
  content: '<p>loading</p>',
  id: '',
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DETAILS_DATA':
      return state.merge({title: action.title, content: action.content});
    case 'UPDATE_NEWS_ID':
      return state.set('id', action.data);
    default:
      return state;
  }
};
