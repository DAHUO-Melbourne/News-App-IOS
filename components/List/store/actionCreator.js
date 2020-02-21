import * as listConstants from './constants';
import * as contentContents from '../../Content/store/constants';
export const updateNewsId = data => ({
  type: contentContents.UPDATE_NEWS_ID,
  data: data,
});
export const initListData = data => ({
  type: listConstants.INIT_LIST_DATA,
  data: data,
});
