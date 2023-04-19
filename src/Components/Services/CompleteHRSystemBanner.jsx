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
                HRMS is an all-inclusive HR system that simply requires a
                browser
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Fade triggerOnce duration={1200} direction="up">
              <Typography>
                Say goodbye to complicated HR software that requires extensive
                training and setup. With our user-friendly and high-performance
                HR software, you can easily manage your employees from anywhere,
                using any browser. Our software provides a hassle-free
                experience, so you can focus on what really matters: your
                people.
              </Typography>
            </Fade>
            <Fade duration={1500} direction="up" triggerOnce>
              <Typography>
                Our HRMS software system provides businesses of all sizes with
                better employee management tools, whether it&apos;s called a
                Human Resources Management System (HRMS) or a Human Resources
                Information System (HRIS). With our software, you can streamline
                your HR operations and automate repetitive tasks, allowing you
                to save time and reduce errors.
              </Typography>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompleteHRSystemBanner;
