import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import userReducer from 'store/modules/user/reducer';
import theme from 'styles/theme';

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

export const HooksWrapper = ({ children, reduxStore }) => {
  const store = configureStore({ reducer: { user: userReducer }, reduxStore });

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

const QueryProvider = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const pureWrapper = (children, preloadedState = {}) => {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState,
  });

  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <StyledThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            {children}
          </ThemeProvider>
        </StyledThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

const wrapper = (children, { preloadedState = {} } = {}) => {
  return render(pureWrapper(children, preloadedState), {
    wrapper: BrowserRouter,
  });
};

export default wrapper;
