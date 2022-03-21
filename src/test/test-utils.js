import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer from '../store/modules/user/reducer';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);
const client = new QueryClient();

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
      <QueryClientProvider client={client}>
        <StyledThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Children />
          </ThemeProvider>
        </StyledThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>,
    { wrapper: BrowserRouter }
  );
};

export default wrapper;
