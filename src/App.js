import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import theme from './styles/theme';
import Routes from './routes';
import  {store,persistor}  from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { CircularLoading } from 'components/loading-progress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<CircularLoading />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <StyledThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <CssBaseline />
              <ThemeProvider theme={theme}>
                <Routes />
                <ToastContainer position='top-right' closeOnClick />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </StyledThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
