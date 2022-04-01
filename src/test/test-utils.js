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
import { setLogger } from 'react-query';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

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
      <QueryProvider>
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
