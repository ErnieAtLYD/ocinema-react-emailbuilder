import React from "react";
import { shallow } from "enzyme";
import Showtimes from "./Showtimes";
import { Callout } from "react-inky";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Showtimes />);
});

it("renders without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});

it("is wrapped around a Callout", () => {
  let calloutWrapper = wrapper.find(Callout);
  expect(calloutWrapper).toExist();
});
