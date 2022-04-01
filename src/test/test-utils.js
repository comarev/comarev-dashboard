import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import userReducer from '../store/modules/user/reducer';
import theme from '../styles/theme';

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);
const client = new QueryClient();

const QueryProvider = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
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
      <QueryProvider children={children}>
        <StyledThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Children />
          </ThemeProvider>
        </StyledThemeProvider>
      </QueryProvider>
    </ReduxProvider>,
    { wrapper: BrowserRouter }
  );
};

export default wrapper;
