// @flow
import React from "react";
import LayoutItemContainer from "../containers/LayoutItemContainer";

type ComponentType = {
  layout: NewsletterLayoutType
};

const RenderedNewsletter = ({ layout }: ComponentType): any =>
  layout.map((item: NewsletterLayoutItemType, index: number): React$Element<
    typeof LayoutItemContainer
  > => (
    <LayoutItemContainer key={item.id} id={item.id} index={index} item={item} />
  ));

export default RenderedNewsletter;
