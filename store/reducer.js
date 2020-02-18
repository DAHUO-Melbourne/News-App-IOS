import {combineReducers} from 'redux-immutable';
import {reducer as ListReducer} from '../components/List/store';
import {reducer as ContentReducer} from '../components/Content/store';
export default combineReducers({
  List: ListReducer,
  Content: ContentReducer,
});
