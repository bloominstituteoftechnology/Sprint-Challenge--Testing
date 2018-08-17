// this does stuff to configure enzyme but I don't really know what's happening
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });