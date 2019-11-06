import { EActionKeys } from '../actions';
import { IPanelItem } from '../types';

const initialState = {
  id: 0,
  layout: '',
  content: '',
  htmldescription:'',
  htmlquotes: '',
  posterurl: ''
};

export default function panelItem(
  state: IPanelItem = initialState,
  action: any
): IPanelItem {
  switch (action.type) {
    case EActionKeys.EDIT_LAYOUT_ITEM:
      return action.payload.item;

    case EActionKeys.UPDATE_PANEL_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    default:
      return state;
  }
}
