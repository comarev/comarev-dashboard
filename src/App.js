import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Routes from './routes';

function App() {
  return (
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
