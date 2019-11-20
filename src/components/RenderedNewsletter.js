// @flow
import React from "react";
import LayoutItem from "../components/LayoutItem";

type ComponentType = {
  layout: NewsletterLayoutType,
  deleteLayoutItem: Function,
  duplicateLayoutItem: Function,
  editLayoutItem: Function,
  moveLayoutItem: Function
};

const RenderedNewsletter = ({
  layout,
  deleteLayoutItem,
  duplicateLayoutItem,
  editLayoutItem,
  moveLayoutItem
}: ComponentType): any =>
  layout.map((item: NewsletterLayoutItemType, index: number): React$Element<
    typeof LayoutItem
  > => (
    <LayoutItem
      key={item.id}
      id={item.id}
      index={index}
      item={item}
      duplicateLayoutItem={duplicateLayoutItem}
      deleteLayoutItem={deleteLayoutItem}
      editLayoutItem={editLayoutItem}
      moveLayoutItem={moveLayoutItem}
    />
  ));

export default RenderedNewsletter;
