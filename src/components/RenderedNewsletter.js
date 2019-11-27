// @flow
import React from "react";
import LayoutItem from "../components/LayoutItem";

type RenderedNewsletterType = {
  layout: NewsletterLayoutType,
  deleteLayoutItem: Function,
  dropElementIntoColumnContent: Function,
  dropElementIntoColumnElement: Function,
  duplicateLayoutItem: Function,
  editLayoutItem: Function,
  moveLayoutItem: Function,
};

const RenderedNewsletter = ({
  layout,
  deleteLayoutItem,
  dropElementIntoColumnContent,
  dropElementIntoColumnElement,
  duplicateLayoutItem,
  editLayoutItem,
  moveLayoutItem,
}: RenderedNewsletterType): any =>
  layout.map((item: NewsletterLayoutItemTypeV2, index: number): React$Element<
    typeof LayoutItem
  > => (
    <LayoutItem
      key={item.id}
      id={item.id}
      index={index}
      item={item}
      deleteLayoutItem={deleteLayoutItem}
      dropElementIntoColumnContent={dropElementIntoColumnContent}
      dropElementIntoColumnElement={dropElementIntoColumnElement}
      duplicateLayoutItem={duplicateLayoutItem}
      editLayoutItem={editLayoutItem}
      moveLayoutItem={moveLayoutItem}
    />
  ));

export default RenderedNewsletter;
