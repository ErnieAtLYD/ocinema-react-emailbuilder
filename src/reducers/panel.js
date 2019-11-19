// @flow
const initialState = {
  visibility: false
};

export default function panel(
  state: PanelStateType = initialState,
  action: Action
) {
  switch (action.type) {
    case "DELETE_LAYOUT_ITEM":
      return {
        ...state,
        visibility: false
      };

    case "EDIT_LAYOUT_ITEM":
      return {
        ...state,
        visibility: true
      };

    case "HIDE_PANEL":
    return {
      ...state,
      visibility: false
    };

    default:
      return state;
  }
}
