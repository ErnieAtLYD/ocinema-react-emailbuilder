// @flow
import produce from "immer";

const initialState = [];
export default function layout(
  state: NewsletterLayoutType = initialState,
  action: Action
) {
  var newLayout;
  let newElement;
  let nextState;

  switch (action.type) {
    case "CREATE_LAYOUT_ITEM":
      return [...state, action.payload];

    case "DELETE_LAYOUT_ITEM":
      newLayout = [...state];
      newLayout.splice(action.key, 1);
      return newLayout;

    case "DROP_ELEMENT_INTO_COLUMN_CONTENT":
      // find the ColumnContent component by columnId.
      let newStateIndex = state.findIndex(({id}) => id === action.payload.columnId);
      let oldStateIndex = state.findIndex(({id}) => id === action.payload.item.parentId);
      newElement = {
        id: action.payload.item.id,
        parentId: action.payload.columnId,
      };
      nextState = produce(state, draftState => {
        // remove the element from the old container
        draftState[oldStateIndex].contents.splice(action.payload.item.index, 1);
        // add the element to the new container
        draftState[newStateIndex].contents.push(newElement);
      });
      return nextState;

    case "DROP_DRAGGED_BUTTON_INTO_COLUMN_CONTENT":
      const ts = new Date().getTime();
      const {columnId, index} = action.payload;

      // find the ColumnContent component by columnId.
      let stateIndex = state.findIndex(({id}) => id === columnId);
      newElement = {id: ts, parentId: columnId};

      // Now get the contents array and insert into the index'ed element
      // Note: this reducer uses immer while all the others use vanilla JS.
      nextState = produce(state, draftState => {
        draftState[stateIndex].contents.splice(index, 0, newElement);
      });
      return nextState;

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
        [action.payload.name]: action.payload.value,
      };
      newLayout[action.payload.index] = temp;
      return newLayout;

    default:
      return state;
  }
}
