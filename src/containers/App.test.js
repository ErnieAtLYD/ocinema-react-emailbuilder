import React from 'react';
import { shallow } from 'enzyme';
import { wrapInTestContext } from "react-dnd-test-utils";
import App from './App';

it('renders without crashing', () => {
  const AppContext = wrapInTestContext(App);
  shallow(<AppContext />);
});
