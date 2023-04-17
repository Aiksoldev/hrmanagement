import { responsiveFontSizes, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
let theme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 300,
      sm: 650,
      md: 900,
      lg: 1200,
      xl: 1300,
    },
    unit: "px",
  },
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#ffffff !important",
      grey: "#333333",
    },
    primary: {
      main: "#b0caeb !important ",
      contrastText: "#fff",
      opacity: "RGBA(52,128,250,0.15)",
    },
    secondary: {
      main: "#f4f7fa !important",
      contrastText: "#fff",
    },
    background: {
      main: "#006fff !important",
      contrastText: "#fff",
      secondary: "#fafafa",
      iconContainer: "#f5f5f5",
      icons: "#e0e0e0",
      footer: "#141313",
    },
    BackgroundGradient: {
      main: "linear-gradient(to bottom, #ffffff , #A5C2F7 )",
    },
    white: {
      main: "#FFFFFF !important",
      contrastText: "#fff",
      transparent: "#FFFFFF10",
    },
    black: { main: "#041B15", contrastText: "#fff" },

    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#6C727F",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
      G1: "#FF4646",
      G2: "#C9C9C9",
      B1: "",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "rgba(0, 0, 0, 0.6)",
      white: "rgb(255,255,255)",
      greyed: "#6C727F",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },

  padding: {
    standard: "8px 10px",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    fontSizeRegular: "12px !important",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    cardTitle: {
      fontFamily: "Roboto !important",
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    h1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "75px",
      color: "#1a1a1a",
    },
    h2: {
      fontFamily: "Roboto !important",
      fontWeight: 900,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: "Roboto !important",
      fontWeight: 500,
      fontSize: "2.3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: "Roboto !important",
      fontWeight: 400,

      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily: "Roboto !important",
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: "Roboto !important",
      fontWeight: 400,

      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily: "Roboto !important",
      fontWeight: 500,
      fontSize: "1rem",

      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily: "Roboto !important",
      fontWeight: 500,
      fontSize: "0.875rem",

      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontFamily: "Roboto !important",
      fontWeight: 400,
      fontSize: "1rem",
      color: "#6C727F",
      lineHeight: 1.7,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: "Roboto !important",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          // borderRadius: theme.shape.borderRadius,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
