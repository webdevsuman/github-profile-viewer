import "./App.css";
import Header from "./layout/Header";
import Routing from "./routing/Routing";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const isDark = window.localStorage.getItem("mode");
const darkTheme = isDark
  ? createTheme({
      palette: {
        mode: "dark",
      },
    })
  : createTheme({
      palette: {
        mode: "light",
      },
    });

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Routing />
      </ThemeProvider>
    </>
  );
}

export default App;
