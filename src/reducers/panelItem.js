import { EDIT_LAYOUT_ITEM, UPDATE_PANEL_FIELD } from '../actions';

const initialState = {
  id: '',
  layout: '',
  content: '',
  htmldescription:'',
  htmlquotes: '',
  posterurl: ''
};

export default function panelItem(state = initialState, action) {
  switch (action.type) {
    case EDIT_LAYOUT_ITEM:
      return action.payload.item;

    case UPDATE_PANEL_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    default:
      return state;
  }
}
