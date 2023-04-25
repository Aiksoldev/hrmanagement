import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../Header/Header";
import Footer from "../Footer/Footer";

import SnackBar from "../Snackbar/Snackbar";

export default function Layout({ children }) {
  const [state, setstate] = useState(false);
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY >= 300) {
        setstate(true);
      } else {
        setstate(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (window.scrollY >= 300) {
      setstate(true);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        onScroll={(e) => {
          console.log(e);
        }}
      >
        <Box
          sx={{
            background: !state
              ? "transparent"
              : (theme) => theme.palette.background.main,
            position: state ? "sticky" : "absolute",
            top: "0px",
            width: "100%",
            transition: "0.5s",
            zIndex: 1000,
          }}
        >
          <Navbar enable={state} />
        </Box>
        <Box sx={{ overflowX: "hidden" }}>{children}</Box>
        <Box>
          <Footer />
        </Box>
      </Box>
      <SnackBar />
    </>
  );
}
