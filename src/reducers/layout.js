import {
  CREATE_LAYOUT_ITEM,
  DELETE_LAYOUT_ITEM,
  MOVE_LAYOUT_ITEM,
  UPDATE_PANEL_FIELD
} from '../actions';

const initialState = [
  { id: 1, layout: 'header', content: 'foo', htmldescription:'bar', htmlquotes: '', posterurl: '' },
  { id: 2, layout: 'filmlayout', content: 'bar', htmldescription:'baz', htmlquotes: '', posterurl: '' },
  { id: 3, layout: 'footer', content: 'baz', htmldescription:'', htmlquotes: '', posterurl: '' }
];

export default function layout(state = initialState, action) {

  var newLayout;

  switch (action.type) {
    case CREATE_LAYOUT_ITEM:
      return [...state, action.payload];

    case DELETE_LAYOUT_ITEM:
      newLayout = [...state];
      newLayout.splice(action.key, 1);
      return newLayout;

    case MOVE_LAYOUT_ITEM:
      newLayout = [...state];
      if (action.newIndex >= newLayout.length) {
        var k = action.newIndex - newLayout.length + 1;
        while (k--) {
          newLayout.push(undefined);
        }
      }
      newLayout.splice(
        action.newIndex,
        0,
        newLayout.splice(action.key, 1)[0]
      );
      return newLayout;

    case UPDATE_PANEL_FIELD:
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
