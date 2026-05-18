import { createTheme } from "@mui/material";

const primary = {
  main: "#1976d2",
  light: "#42a5f5",
  dark: "#1565c0",
};

const secondary = {
  main: "#9c27b0",
  light: "#ba68c8",
  dark: "#7b1fa2",
};

const error = {
  main: "#d32f2f",
  light: "#ef5350",
  dark: "#c62828",
};

const warning = {
  main: "#ed6c02",
  light: "#ff9800",
  dark: "#e65100",
};

const info = {
  main: "#0288d1",
  light: "#03a9f4",
  dark: "#01579b",
};

const success = {
  main: "#2e7d32",
  light: "#4caf50",
  dark: "#1b5e20",
};

const theme = createTheme({
  palette: {
    background: {
      default: "#FAFAFA",
    },
    primary: {
      main: secondary.main,
      light: secondary.light,
      dark: secondary.dark,
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
