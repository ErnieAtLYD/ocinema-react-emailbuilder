// @flow
import React, {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  minHeight: 20,
  border: "1px dotted red",
};

// called from <ColumnContent>
const ColumnElement = ({
  dropElementIntoColumnContent,
  dropElementIntoColumnElement,
  id,
  index,
  parentId,
}: ColumnElementType): React$Element<"div"> => {
  let backgroundColor = "#ccc";
  let borderTopColor = "red";
  let borderBottomColor = "red";
  let borderTopStyle = "dotted";
  let borderBottomStyle = "dotted";

  const ref = useRef(null);
  const [isUpperHalf, setUpperHalf] = useState();
  const [{canDrop, isOver}, drop] = useDrop({
    accept: [ItemTypes.COLUMNELEMENT, ItemTypes.PANELBUTTON],
    drop: () => ({
      name: id,
      index: isUpperHalf ? index : index + 1,
      isColumnContainer: false,
      parentId: parentId,
    }),
    collect: (monitor: empty) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    hover(item, monitor): void {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

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
      // moveLayoutItem(dragIndex, hoverIndex);
      // item.index = hoverIndex;
    },
  });
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.COLUMNELEMENT,
      id: id,
      index: index,
      name: "element",
      parentId: parentId,
    },
    collect: (monitor: empty) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor): void => {
      const dropResult = monitor.getDropResult();

      // the "&& dropElementIntoColumnContent" is due to flow type being an
      // optional function
      if (item && dropResult && dropElementIntoColumnContent) {
        // console.log(item, dropResult);
        // alert(
        //   `You dropped ${item.name} into ${dropResult.name}! It has an index of ${dropResult.index}`
        // );
        if (dropResult.isColumnContainer) {
          dropElementIntoColumnContent(item, dropResult.name);
        } else {
          // Dropped on another element container, but could either be its
          // own column element or a different one
          if (dropElementIntoColumnElement)
            dropElementIntoColumnElement(item, dropResult);
        }
      }
    },
  });

  const isActive = canDrop && isOver;
  if (isActive) {
    backgroundColor = "darkgreen";
    borderTopColor = isUpperHalf ? "yellow" : "red";
    borderBottomColor = !isUpperHalf ? "yellow" : "red";

    borderTopStyle = isUpperHalf ? "solid" : "dotted";
    borderBottomStyle = !isUpperHalf ? "solid" : "dotted";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  const opacity: number = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className="element"
      ref={ref}
      style={{
        ...style,
        backgroundColor,
        borderTopColor,
        borderBottomColor,
        borderTopStyle,
        borderBottomStyle,
        opacity,
      }}
    >
      test element: {id}
    </div>
  );
};

export default ColumnElement;
