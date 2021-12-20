// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

configure({ adapter: new Adapter() });
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
