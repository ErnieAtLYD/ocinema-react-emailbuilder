import React from 'react';
import { wrapInTestContext } from "react-dnd-test-utils";
import { shallow, mount } from 'enzyme';
import LayoutItem from './LayoutItem';
import LayoutTemplateWrapper from './LayoutTemplateWrapper';

describe('LayoutItem', () => {
  it('renders without crashing', () => {
    const LayoutContext = wrapInTestContext(LayoutItem);
    shallow(<LayoutContext />);
  });
});

// May have to do this through a proper mount as evertyhing is wrapped in that drag and drop context
describe('LayoutItem mounted', () => {
  xit('renders without crashing', () => {
    const LayoutContext = wrapInTestContext(LayoutItem);
    let props = { item: {} }
    const mountedwrapper = mount(<LayoutContext {...props} />)
    let calloutWrapper = mountedwrapper.find(LayoutTemplateWrapper);
    expect(calloutWrapper).toExist();
  });
});
