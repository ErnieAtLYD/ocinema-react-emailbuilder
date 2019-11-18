import React from 'react';
import { shallow } from 'enzyme';
import ExportTemplate from './ExportTemplate'

describe('ExportTemplate', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ExportTemplate  />);
    // console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});
