// @flow
import React from "react";
import {useDrag} from "react-dnd";
import Button from "@material-ui/core/Button";
import ItemTypes from "./ItemTypes";
const style = {
  cursor: "move",
};

type TestDragType = {
  dropDraggedButtonIntoColumnContent: Function,
};

/**
 * Right now, TestDrag is being called from <PanelOff>.
 */
const TestDrag = ({dropDraggedButtonIntoColumnContent}: TestDragType) => {
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.PANELBUTTON,
      name: "testobject",
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(
        //   `You dropped ${item.name} into ${dropResult.name}! It has an index of ${dropResult.index}`
        // );
        if (dropResult.isColumnContainer) {
          // dropped on a ColumnContent component
          dropDraggedButtonIntoColumnContent(dropResult.name, -1);
        } else {
          // dropped on a ColumnElement component
          dropDraggedButtonIntoColumnContent(dropResult.parentId, dropResult.index);
        }
      }
    },
  });
  return (
    <Button ref={drag} style={{...style}} variant="contained">
      Drag Me
    </Button>
  );
};

export default TestDrag;
