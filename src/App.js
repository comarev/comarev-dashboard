import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import theme from './styles/theme';
import Routes from './routes';
import store from './store';
import Persistor from './components/persistor/persistor';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <Persistor>
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
      </Persistor>
    </Provider>
  );
}

export default App;
