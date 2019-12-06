// @flow
import ItemTypes from "../components/ItemTypes";

const initialState = {
  content: true,
  htmldescription: true,
  htmlquotes: true,
  posterurl: true,
  bannerurl: true,
  ctalabel: true,
  ctaurl: true
};

export default function panelFieldStatus(state = initialState, action: Action) {
  switch (action.type) {
    case "EDIT_LAYOUT_ITEM":
      switch (action.payload.item.layout) {
        case ItemTypes.LAYOUT_TYPE.HEADER:
          return {
            ...initialState,
            htmlquotes: false,
            bannerurl: false,
            posterurl: false,
            ctalabel: false
          };
        case ItemTypes.LAYOUT_TYPE.FOOTER:
          return state;
        case ItemTypes.LAYOUT_TYPE.SECTION_BREAK:
          return state;
        case ItemTypes.LAYOUT_TYPE.SECTION_IMAGE:
          return state;
        case ItemTypes.LAYOUT_TYPE.SECTION_HEADER:
          return {
            ...initialState,
            htmlquotes: false,
            ctalabel: false,
            bannerurl: false
          };
        case ItemTypes.LAYOUT_TYPE.TEMPLATE_EVENT:
          return initialState;
        case ItemTypes.LAYOUT_TYPE.TEMPLATE_MEMBERSHIP:
          return { ...initialState, htmlquotes: false };
        default:
          return state;
      }
      return state;

    default:
      return state;
  }
}
