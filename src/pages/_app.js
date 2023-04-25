import Layout from "@/Components/Layout/Layout";
import { SnackbarContextProvider } from "@/Context/SnackbarContext";
import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarContextProvider>
      </ThemeProvider>
    </>
  );
}
