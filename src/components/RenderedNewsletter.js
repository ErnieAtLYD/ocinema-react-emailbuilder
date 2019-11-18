// @flow
import React from 'react';
import LayoutItem from '../components/LayoutItem'

type ComponentType = {
  layout: NewsletterLayoutType,
  deleteLayoutItem: Function,
  editLayoutItem: Function,
  moveLayoutItem: Function
}

const RenderedNewsletter = ({
  layout,
  deleteLayoutItem,
  editLayoutItem,
  moveLayoutItem
}: ComponentType): any => (
  layout.map((
    item: NewsletterLayoutItemType,
    index: number
  ): React$Element<typeof LayoutItem> =>
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
