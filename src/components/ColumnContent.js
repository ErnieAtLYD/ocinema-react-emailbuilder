// @flow
import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import ItemTypes from "./ItemTypes";
import ColumnElement from "./ColumnElement";

const style = {
  minHeight: 50,
};

type ColumnContentType = {
  id: string,
  contents: Array<ColumnElementType>,
};

// called from <LayoutTemplateWrapper>
const ColumnContent = ({id, contents = []}: ColumnContentType) => {
  const ref = useRef(null);
  const [{canDrop, isOver}, drop] = useDrop({
    accept: ItemTypes.PANELBUTTON,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return {
        name: id,
        isColumnContainer: true,
      };
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver({shallow: true}),
    }),
  }); // end useDrop
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
      <div style={{float: "right"}}>id: {id}</div>
      {contents &&
        contents.map((content: ColumnElementType) => (
          <ColumnElement id={content.id} key={content.id} />
        ))}
    </div>
  );
};

export default ColumnContent;
