import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./styles/theme";
import LoginPage from "./pages/login/login.component";

function App() {
  return (
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
