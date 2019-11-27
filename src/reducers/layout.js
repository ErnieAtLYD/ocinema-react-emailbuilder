// @flow
import produce from "immer";
import _ from "lodash";

const initialState = [];

export default function layout(
  state: NewsletterLayoutType = initialState,
  action: Action
) {
  let contentArray;
  var newLayout;
  let newElement;
  let nextState;
  let newIndexes;
  let oldIndexes;

  /**
   * From the layout state, grab the layout index (root level) and element index
   * (second level) of the element given its columnId. Returns -1 for both
   * indexes if the columnId can't be found
   */
  const getIndexesFromColumnId = (
    id: number
  ): {layoutIndex: number, elementIndex: number} => {
    for (let [layoutIndex, layoutItem] of state.entries()) {
      let elementIndex = layoutItem.elements.findIndex(
        element => element.columnId === id
      );
      if (elementIndex > -1) {
        return {layoutIndex: layoutIndex, elementIndex: elementIndex};
      }
    }
    return {layoutIndex: -1, elementIndex: -1};
  };

  switch (action.type) {
    case "CREATE_LAYOUT_ITEM":
      let newLayoutTemp;
      // previously we pushed action.payload
      newLayoutTemp = action.payload;
      if (action.payload.layout === "column-1") {
        newLayoutTemp = {
          id: action.payload.id,
          layout: "column-1",
          elements: [
            {
              columnId: action.payload.id + 1,
              contents: [],
            },
          ],
        };
      } else if (action.payload.layout === "column-2") {
        newLayoutTemp = {
          id: action.payload.id,
          layout: "column-2",
          elements: [
            {
              columnId: action.payload.id + 1,
              contents: [],
            },
            {
              columnId: action.payload.id + 2,
              contents: [],
            },
          ],
        };
      }
      nextState = produce(state, draftState => {
        draftState.push(newLayoutTemp);
      });
      return nextState;

    case "DELETE_LAYOUT_ITEM":
      newLayout = [...state];
      newLayout.splice(action.key, 1);
      return newLayout;

    case "DROP_ELEMENT_INTO_COLUMN_ELEMENT":
      let {source, target} = action.payload;

      // find the ColumnContent component by columnId.
      newIndexes = getIndexesFromColumnId(target.parentId);
      oldIndexes = getIndexesFromColumnId(source.parentId);

      nextState = produce(state, draftState => {
        contentArray =
          draftState[oldIndexes.layoutIndex].elements[oldIndexes.elementIndex].contents;

        if (_.isEqual(newIndexes, oldIndexes)) {
          // treat like a good old fashioned move
          contentArray.splice(target.index, 0, contentArray.splice(source.index, 1)[0]);
        } else {
          // remove the element from the old container
          newElement = {
            id: source.id,
            parentId: target.parentId,
          };
          contentArray.splice(source.index, 1);

          // add the element to the new container
          draftState[newIndexes.layoutIndex].elements[
            newIndexes.elementIndex
          ].contents.splice(target.index, 0, newElement);
        }
      });
      return nextState;

    case "DROP_ELEMENT_INTO_COLUMN_CONTENT":
      // find the ColumnContent component by columnId.
      newIndexes = getIndexesFromColumnId(action.payload.columnId);
      oldIndexes = getIndexesFromColumnId(action.payload.item.parentId);
      newElement = {
        id: action.payload.item.id,
        parentId: action.payload.columnId,
      };

      nextState = produce(state, draftState => {
        // remove the element from the old container
        draftState[oldIndexes.layoutIndex].elements[
          oldIndexes.elementIndex
        ].contents.splice(action.payload.item.index, 1);

        // add the element to the new container
        draftState[newIndexes.layoutIndex].elements[
          newIndexes.elementIndex
        ].contents.push(newElement);
      });
      return nextState;

    case "DROP_DRAGGED_BUTTON_INTO_COLUMN_CONTENT":
      const ts = new Date().getTime();
      const {columnId, index} = action.payload;

      // find the ColumnContent component by columnId.
      newIndexes = getIndexesFromColumnId(columnId);

      newElement = {id: ts, parentId: columnId};
      nextState = produce(state, draftState => {
        draftState[newIndexes.layoutIndex].elements[
          newIndexes.elementIndex
        ].contents.splice(index, 0, newElement);
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
