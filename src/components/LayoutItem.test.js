import React from "react";
import { wrapInTestContext } from "react-dnd-test-utils";
import { shallow, mount } from "enzyme";
import LayoutItem from "./LayoutItem";
import LayoutTemplateWrapper from "./LayoutTemplateWrapper";
import EditIcon from "@material-ui/icons/Edit";

describe("LayoutItem", () => {
  it("renders without crashing", () => {
    const LayoutContext = wrapInTestContext(LayoutItem);
    shallow(<LayoutContext />);
  });

  xit("properly fires `onClick` when EditIcon is clicked", () => {});

  xit("properly fires `onClick` when DeleteIcon is clicked", () => {});

  xit("properly fires `onClick` when FileCopyIcon is clicked", () => {});
});

// May have to do this through a proper mount as evertyhing is wrapped in that drag and drop context
describe("LayoutItem mounted", () => {
  xit("renders without crashing", () => {
    const LayoutContext = wrapInTestContext(LayoutItem);
    let props = { item: {} };
    const mountedwrapper = mount(<LayoutContext {...props} />);
    let calloutWrapper = mountedwrapper.find(LayoutTemplateWrapper);
    expect(calloutWrapper).toExist();
  });
});
