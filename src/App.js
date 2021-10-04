import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import theme from './styles/theme';
import Routes from './routes';
import store from './store';
import Persistor from './components/persistor/persistor';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <Provider store={store}>
      <Persistor>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Routes />
            <ToastContainer position='top-right' closeOnClick />
          </ThemeProvider>
        </StyledThemeProvider>
      </Persistor>
    </Provider>
  );
}

export default App;
