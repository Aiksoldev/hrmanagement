import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import service2 from "../../Assets/services/service2.png";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      overflow: "hidden",

      background: "url(./service2.png)",
      backgroundPosition: "right bottom",
      backgroundRepeat: "no-repeat",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      justifyItems: "space-evenly",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row-reverse",
      gap: "20px",

      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    imageContainer: {
      width: "100%",
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
    descContainer: {
      display: "flex",
      gap: "10px",
    },
  };
});

const CompleteHRSystemBanner = () => {
  const {
    container,
    subContainer,
    contentContainer,
    imageContainer,
    image,
    descContainer,
  } = useStyle();

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={imageContainer}>
          <Image src={service2} alt={""} className={image} />
        </Box>
        <Box className={contentContainer}>
          <Box>
            <Fade duration={1000} direction="up" triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Team Suite is a complete HR system that only needs a browser
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Fade triggerOnce duration={1200} direction="up">
              <Typography>
                Nothing complicated. No fuss. Just open any browser and enjoy
                user-friendly, high-performance HR software that lets you make
                big company impact from anywhere.
              </Typography>
            </Fade>
            <Fade duration={1500} direction="up" triggerOnce>
              <Typography>
                Team Suite is a software system used by small and large
                businesses for better employee management—also called Human
                Resources Management Systems (HRMS), Human Resources Information
                Systems (HRIS) or Human Capital Management (HCM) software
              </Typography>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompleteHRSystemBanner;