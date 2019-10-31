import React from 'react';
import LayoutItem from '../components/LayoutItem'

const RenderedNewsletter = ({
  layout,
  deleteLayoutItem,
  editLayoutItem,
  moveLayoutItem
}) => (
  layout.map((item, index) =>
    <LayoutItem
      key={item.id}
      id={item.id}
      index={index}
      item={item}
      deleteLayoutItem={deleteLayoutItem}
      editLayoutItem={editLayoutItem}
      moveLayoutItem={moveLayoutItem}
    />)
)

export default RenderedNewsletter;
