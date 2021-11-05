import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { ToastContainer } from 'react-toastify';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

const wrapper = (children) => {
  const Children = children;

  return render(
    <Wrapper>
      <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Children />
        </ThemeProvider>
      </StyledThemeProvider>
    </Wrapper>,
    { wrapper: BrowserRouter }
  );
};

export default wrapper;
