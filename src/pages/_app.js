import Layout from '@/Components/Layout/Layout';
import '@/styles/globals.css'
import theme from '@/theme/theme';
import { ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
