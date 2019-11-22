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

const TestDrag = ({dropDraggedButtonIntoColumnContent}: TestDragType) => {
  const [{isDragging}, drag] = useDrag({
    item: {
      name: "testobject",
      type: ItemTypes.PANELBUTTON,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
        if (dropResult.isColumnContainer) {
          dropDraggedButtonIntoColumnContent(dropResult.name);
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <Button ref={drag} style={{...style}} variant="contained">
      Drag Me
    </Button>
  );
};

export default TestDrag;
