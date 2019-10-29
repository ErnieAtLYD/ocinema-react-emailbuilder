import { EDIT_LAYOUT_ITEM, MOVE_LAYOUT_ITEM } from '../actions';

const initialState = -1;

export default function panelIndex(state = initialState, action) {
  switch (action.type) {
    case EDIT_LAYOUT_ITEM:
      return action.payload.index;

    case MOVE_LAYOUT_ITEM:
      if (action.key===state) {
        return action.newIndex;
      } else if (action.newIndex>=panelIndex && action.key<state) {
        return state-1;
      } else if (action.newIndex<=panelIndex && action.key>state) {
        return state+1;
      }
      return state;

    default:
      return state;
  }
}
