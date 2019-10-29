import { DELETE_LAYOUT_ITEM, EDIT_LAYOUT_ITEM, HIDE_PANEL } from '../actions';

const initialState = {
  visibility: false
};

export default function panel(state = initialState, action) {
  switch (action.type) {
    case DELETE_LAYOUT_ITEM:
      return {
        ...state,
        visibility: false
      };

    case EDIT_LAYOUT_ITEM:
      return {
        ...state,
        visibility: true
      };

    case HIDE_PANEL:
    return {
      ...state,
      visibility: false
    };

    default:
      return state;
  }
}
