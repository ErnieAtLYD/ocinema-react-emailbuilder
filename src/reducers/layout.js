// @flow
import ItemTypes from "../components/ItemTypes";
const initialState = [
  {
    id: 1,
    layout: ItemTypes.LAYOUT_TYPE.HEADER,
    htmldescription:
      "Your favorite independent cinema is bringing ﻿you more of the kind of movies you love."
  },
  {
    id: 5,
    layout: ItemTypes.LAYOUT_TYPE.SECTION_BREAK
  },
  {
    id: 11,
    layout: "full-bleed-wrapper",
    content: "Around town",
    htmldescription: "Check out these cool events around Miami"
  },
  {
    id: 6,
    layout: "full-bleed-wrapper",
    content: "Next week"
  },
  {
    id: 7,
    layout: "membership-drive",
    content: "bar",
    htmldescription:
      "As a nonprofit cinema, the proceeds from our membership program go right back into increasing the diversity of our film presentations and events. An O Cinema membership supports a cornerstone of the cultural life of our community- so you can both feel good and do good by joining. Become a member today!",
    ctaurl: "https://www.o-cinema.org/membership/",
    ctalabel: "Join now"
  },
  {
    id: 9,
    layout: "full-bleed-wrapper-2",
    bannerurl:
      "https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/sponsors.jpg"
  },
  {
    id: 12,
    layout: "full-bleed-wrapper-2",
    bannerurl:
      "https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/nextweek.jpg"
  },
  {
    id: 3,
    layout: ItemTypes.LAYOUT_TYPE.FOOTER
  }
];
export default function layout(
  state: NewsletterLayoutType = initialState,
  action: Action
) {
  var newLayout;
  switch (action.type) {
    case "CREATE_LAYOUT_ITEM":
      return [...state, action.payload];

    case "DELETE_LAYOUT_ITEM":
      newLayout = [...state];
      newLayout.splice(action.key, 1);
      return newLayout;

    case "EXPORT_HTML":
      return state;

    case "MOVE_LAYOUT_ITEM":
      newLayout = [...state];
      if (action.newIndex >= newLayout.length) {
        var k = action.newIndex - newLayout.length + 1;
        while (k--) {
          newLayout.push(undefined);
        }
      }
      newLayout.splice(action.newIndex, 0, newLayout.splice(action.key, 1)[0]);
      return newLayout;

    case "UPDATE_PANEL_FIELD":
      newLayout = [...state];
      const temp = {
        ...newLayout[action.payload.index],
        [action.payload.name]: action.payload.value
      };
      newLayout[action.payload.index] = temp;
      return newLayout;

    default:
      return state;
  }
}
