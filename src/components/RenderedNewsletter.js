// @flow
import React from "react";
import LayoutItem from "../components/LayoutItem";

type RenderedNewsletterType = {
  layout: NewsletterLayoutType,
  deleteLayoutItem: Function,
  dropElementIntoColumnContent: Function,
  duplicateLayoutItem: Function,
  editLayoutItem: Function,
  moveLayoutItem: Function,
};

const RenderedNewsletter = ({
  layout,
  deleteLayoutItem,
  dropElementIntoColumnContent,
  duplicateLayoutItem,
  editLayoutItem,
  moveLayoutItem,
}: RenderedNewsletterType): any =>
  layout.map((item: NewsletterLayoutItemType, index: number): React$Element<
    typeof LayoutItem
  > => (
    <LayoutItem
      key={item.id}
      id={item.id}
      index={index}
      item={item}
      deleteLayoutItem={deleteLayoutItem}
      dropElementIntoColumnContent={dropElementIntoColumnContent}
      duplicateLayoutItem={duplicateLayoutItem}
      editLayoutItem={editLayoutItem}
      moveLayoutItem={moveLayoutItem}
    />
  ));

export default RenderedNewsletter;
