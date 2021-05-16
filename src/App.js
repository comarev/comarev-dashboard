import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import Routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </StyledThemeProvider>
    </Provider>
  );
}

export default App;
