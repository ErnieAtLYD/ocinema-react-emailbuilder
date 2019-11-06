import { EActionKeys } from '../actions';

const initialState = {
  visibility: false
};

export default function panel(state = initialState, action) {
  switch (action.type) {
    case EActionKeys.DELETE_LAYOUT_ITEM:
      return {
        ...state,
        visibility: false
      };

    case EActionKeys.EDIT_LAYOUT_ITEM:
      return {
        ...state,
        visibility: true
      };

    case EActionKeys.HIDE_PANEL:
    return {
      ...state,
      visibility: false
    };

    default:
      return state;
  }
}
