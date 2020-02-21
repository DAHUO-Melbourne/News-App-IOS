import * as contentConstants from './constants';
export const updateFontSize = data => ({
  type: contentConstants.UPDATE_FONT_SIZE,
  font: data,
});
export const updateDetailsDate = data => ({
  type: contentConstants.UPDATE_DETAILS_DATA,
  title: data.title.rendered,
  content: data.content.rendered,
  date: data.date,
});
