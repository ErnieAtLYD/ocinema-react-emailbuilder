// @flow
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import React, {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import ItemTypes from "./ItemTypes";
import LayoutTemplateWrapper from "./LayoutTemplateWrapper";
import "./LayoutItem.scss";

type LayoutType = {
  id: number,
  index: number,
  item: any,
  deleteLayoutItem: Function,
  dropElementIntoColumnContent: Function,
  duplicateLayoutItem: Function,
  editLayoutItem: Function,
  moveLayoutItem: Function,
};

const style = {
  backgroundColor: "inherit",
  fontFamily: "Helvetica, Arial, sans-serif",
  width: 580,
  margin: "0 auto",
};

/**
 * The base layout components.
 */
const LayoutItem = ({
  id,
  index,
  item,
  deleteLayoutItem,
  dropElementIntoColumnContent,
  duplicateLayoutItem,
  editLayoutItem,
  moveLayoutItem,
}: LayoutType): React$Element<"div"> => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.LAYOUTITEM,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveLayoutItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{isDragging}, drag] = useDrag({
    item: {type: ItemTypes.LAYOUTITEM, id, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [isHovered, setHover] = useState(false);

  const toggleHover = (event: SyntheticMouseEvent<>) => {
    // be careful distinguishing between event.target and event.currentTarget.
    // in this case it is the former, but event propogation makes things tricky

    // see: http://bit.ly/2OjCbUa
    const target = ((event.target: any): HTMLElement);
    if (target.dataset.component === "layoutitem") {
      setHover(!isHovered);
    }
  };

  const hoverClass: string = isHovered ? " react-hover" : "";
  const opacity: number = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className="layoutitem"
      ref={ref}
      style={{opacity}}
      onMouseOver={toggleHover}
      onMouseOut={toggleHover}
    >
      <div className={`layoutitem--no-hover${hoverClass}`} data-component="layoutitem">
        <div style={style}>
          <LayoutTemplateWrapper
            dropElementIntoColumnContent={dropElementIntoColumnContent}
            item={item}
          />
        </div>
      </div>
      <div className={`layoutitem--hover${hoverClass}`} data-component="layoutitem">
        <EditIcon className="layoutitem__edit" onClick={() => editLayoutItem(index)} />
        <DeleteIcon
          className="layoutitem__delete"
          onClick={() => deleteLayoutItem(index)}
        />
        <FileCopyIcon
          className="layoutitem__duplicate"
          onClick={() => duplicateLayoutItem(index)}
        />
      </div>
    </div>
  );
};

export default LayoutItem;
