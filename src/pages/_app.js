import { StateProvider } from "@/Store";
import theme from "@/Theme/theme";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { Suspense } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={poppins.className}>
        <ThemeProvider theme={theme}>
          <StateProvider>
            <Suspense fallback={<div>loading...</div>}>
              <Component {...pageProps} />
            </Suspense>
          </StateProvider>
          <ToastContainer />
        </ThemeProvider>
      </main>
    </>
  );
}
