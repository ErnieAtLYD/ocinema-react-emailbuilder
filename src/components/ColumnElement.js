// @flow
import React, {useRef, useState} from "react";
import {useDrop} from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  minHeight: 20,
  border: "1px dotted red",
};

// called from <ColumnContent>
const ColumnElement = ({id}: ColumnElementType) => {
  const ref = useRef(null);
  const [isUpperHalf, setUpperHalf] = useState();
  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.PANELBUTTON,
    drop: () => ({
      name: id,
      isColumnContainer: false,
    }),
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Hovering over upper half
      if (hoverClientY < hoverMiddleY) {
        setUpperHalf(true);
        return;
      }
      // Hovering over lower half
      if (hoverClientY > hoverMiddleY) {
        setUpperHalf(false);
        return;
      }
    },
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "#ccc";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  drop(ref);
  return (
    <div ref={ref} style={{...style, backgroundColor}}>
      test element: {id}
    </div>
  );
};

export default ColumnElement;
