import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <h1>Comarev DashBoard</h1>
        </div>
      </ThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
