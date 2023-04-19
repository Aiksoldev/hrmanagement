import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import dash from "../../Assets/aboutus/dash.jpg";
import minidash from "../../Assets/aboutus/minidash.jpg";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      overflow: "hidden",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      justifyItems: "space-evenly",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row-reverse",
      gap: "40px",

      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "20px",
      },
    },
    imageContainer: {
      width: "100%",
      position: "relative",
    },
    contentContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: "20px",
    },
    image: {
      height: "auto",
      width: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "100%",
      },
    },
    miniDash: {
      height: "120px",
      width: "200px",
      position: "absolute",
      bottom: "60px",
      right: "-90px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  };
});

const AdvantageBanner = () => {
  const {
    container,
    subContainer,
    contentContainer,
    imageContainer,
    image,
    miniDash,
  } = useStyle();

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={imageContainer}>
          <Slide duration={1200} direction="right" triggerOnce>
            <Image src={dash} alt={""} className={image} quality={100} />
          </Slide>
          <Slide direction="right" duration={1500} triggerOnce>
            <Image src={minidash} alt="" className={miniDash} quality={100} />
          </Slide>
        </Box>
        <Box className={contentContainer}>
          <Box>
            <Fade duration={1000} direction="up" triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                The HRMS Advantage
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography>
                With 99% retention and hundreds of thousands of happy users, our
                clients will tell you there is no better choice for a complete
                Human Resource Management System or Human Resource Information
                Management System.
              </Typography>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvantageBanner;
