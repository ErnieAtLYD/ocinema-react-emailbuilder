// @flow
import React from "react";
import ItemTypes from "./ItemTypes";

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import SectionBreak from "./layouts/SectionBreak";
import SectionHeader from "./layouts/SectionHeader";
import TemplateGeneric from "./layouts/TemplateGeneric";
import TemplateEvent from "./layouts/TemplateEvent";
import TemplateMembership from "./layouts/TemplateMembership";

import "../styles/newsletter.scss";

const LayoutTemplateWrapper = (obj: LayoutWrapperType) => {
  switch (obj.item.layout) {
    case ItemTypes.LAYOUT_TYPE.HEADER:
      return <Header item={obj.item} />;

    case ItemTypes.LAYOUT_TYPE.TEMPLATE_GENERIC:
      return <TemplateGeneric item={obj.item} />;

    case ItemTypes.LAYOUT_TYPE.SECTION_HEADER:
      return <SectionHeader item={obj.item} />;

    case ItemTypes.LAYOUT_TYPE.SECTION_BREAK:
      return <SectionBreak />;

    case ItemTypes.LAYOUT_TYPE.TEMPLATE_MEMBERSHIP:
      return <TemplateMembership item={obj.item} />;

    case ItemTypes.LAYOUT_TYPE.FOOTER:
      return <Footer />;

    default:
      return <TemplateEvent item={obj.item} />;
  }
};

export default LayoutTemplateWrapper;
