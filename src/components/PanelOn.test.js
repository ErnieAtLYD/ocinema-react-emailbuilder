import React from "react";
import { Button } from "@material-ui/core";
import { createShallow } from "@material-ui/core/test-utils";
import PanelOff from "./PanelOff";

let shallow;
let wrapper;

// see: https://blog.usejournal.com/testing-with-jest-and-enzyme-in-react-part-1-162ce7466128

beforeEach(() => {
  shallow = createShallow();
  wrapper = shallow(<PanelOff />);
});

describe("PanelOff", () => {
  it("renders without crashing", () => {
    // console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  it("should call the onClick function when 'Add a blank section' button is clicked", () => {
    // const mockedFn = jest.fn();
    // wrapper.instance().createLayoutItem = mockedFn;
    // console.log(wrapper.debug());
    // wrapper.find(Button).first().props().onClick();
    // expect(mockedFn).toHaveBeenCalledTimes(1);
  });
});
