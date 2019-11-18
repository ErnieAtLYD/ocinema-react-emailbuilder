import React from 'react';
import { shallow } from 'enzyme';
import RenderedNewsletter from './RenderedNewsletter'

describe('RenderedNewsletter', () => {

  it('renders layout items', () => {
    const layout = [{id: 1}, {id: 2}];
    const wrapper = shallow(<RenderedNewsletter layout={layout} />);
    // console.log(wrapper.debug());
    expect(wrapper.find('LayoutItem')).toBeDefined();
    expect(wrapper.find('LayoutItem')).toHaveLength(layout.length);
    expect(wrapper).toMatchSnapshot();
  });
});
