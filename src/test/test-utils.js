import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

const wrapper = (children) => {
  const Children = children;

  return render(
    <Wrapper>
      <Children />
    </Wrapper>,
    { wrapper: BrowserRouter }
  );
};

export default wrapper;
