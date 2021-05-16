import '@testing-library/jest-dom';
import fakeLocalStorage from './test/mocks/localStorage';

Object.defineProperty(window, 'localStorage', {
  value: fakeLocalStorage,
});
