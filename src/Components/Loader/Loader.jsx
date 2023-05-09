import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import logo from "../../Assets/logo.png";
import Image from "next/image";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      height: "100vh",
      // position: "absolute",
      top: "0px",
      zIndex: "200",
      background: "rgba(250,250,250,0.4)",
      overflow: "hidden",
      position: "fixed",
    
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

const Loader = () => {
  const { container } = useStyle();
  return (
    <Box className={container}>
      <Image src={logo} alt={""} style={{ width: "250px", height: "auto" }} className="loader" />
    </Box>
  );
};

export default Loader;
