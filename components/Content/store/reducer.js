import {fromJS, List} from 'immutable';
const defaultState = fromJS({
  news: List(),
});
export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
