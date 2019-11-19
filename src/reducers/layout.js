// @flow
const initialState = [
  { id: 1, layout: 'header', content: '', htmldescription:'Your favorite independent cinema is bringing ﻿you more of the kind of movies you love.', htmlquotes: '', posterurl: '' },
  { id: 2, layout: 'filmlayout', content: 'bar', htmldescription:'baz', htmlquotes: '', posterurl: '' },
  { id: 5, layout: 'section-break', content: '', htmldescription:'', htmlquotes: '', posterurl: '' },
  { id: 6, layout: 'full-bleed-wrapper', content: '', htmldescription:'', htmlquotes: '', posterurl: '' },
  { id: 4, layout: 'filmlayout', content: 'bar', htmldescription:'baz', htmlquotes: '', posterurl: '' },
  { id: 7, layout: 'membership-drive', content: 'bar', htmldescription:'As a nonprofit cinema, the proceeds from our membership program go right back into increasing the diversity of our film presentations and events. An O Cinema membership supports a cornerstone of the cultural life of our community- so you can both feel good and do good by joining. Become a member today!', htmlquotes: '', posterurl: 'https://www.o-cinema.org/membership/' },
  { id: 9, layout: 'full-bleed-wrapper-2', content: '', bannerurl: 'https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/sponsors.jpg', htmldescription:'', htmlquotes: '', posterurl: '' },
  { id: 3, layout: 'footer', content: '', htmldescription:'', htmlquotes: '', posterurl: '' }
];

export default function layout(
  state: NewsletterLayoutType = initialState,
  action: Action
) {
  var newLayout;
  switch (action.type) {
    case "CREATE_LAYOUT_ITEM":
      return [...state, action.payload];

    case "DELETE_LAYOUT_ITEM":
      newLayout = [...state];
      newLayout.splice(action.key, 1);
      return newLayout;

    case "EXPORT_HTML":
      return state;

    case "MOVE_LAYOUT_ITEM":
      newLayout = [...state];
      if (action.newIndex >= newLayout.length) {
        var k = action.newIndex - newLayout.length + 1;
        while (k--) {
          newLayout.push(undefined);
        }
      }
      newLayout.splice(action.newIndex, 0, newLayout.splice(action.key, 1)[0]);
      return newLayout;

    case "UPDATE_PANEL_FIELD":
      newLayout = [...state];
      const temp = {
        ...newLayout[action.payload.index],
        [action.payload.name]: action.payload.value
      };
      newLayout[action.payload.index] = temp
      return newLayout;

    default:
      return state;
  }
}
