import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer from '../store/modules/user/reducer';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { ToastContainer } from 'react-toastify';

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

const wrapper = (
  children,
  {
    preloadedState,
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
  } = {}
) => {
  const Children = children;

  return render(
    <ReduxProvider store={store}>
      <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Children />
        </ThemeProvider>
      </StyledThemeProvider>
    </ReduxProvider>,
    { wrapper: BrowserRouter }
  );
};

export default wrapper;
