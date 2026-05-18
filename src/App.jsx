import React from "react";
import { ThemeProvider } from "@emotion/react";
import defaulTheme from "./theme/theme";
import Router from "./router";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={defaulTheme}>
      <CssBaseline />
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
