import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import hrpayroll from "../../../Assets/hrpayroll.jpg";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      padding: "50px 0px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      padding: "20px 40px",
      display: "flex",
      alignItems: "center",

      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "20px",
        padding: "10px",
      },
    },
    ImageContainer: {
      width: "100%",
      background: `url(https://www.teamsuite.app/images/icons/image-shap-1.png)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center bottom",

      height: "100%",
      padding: "50px",
      minHeight: "90vh",
      [theme.breakpoints.down("md")]: {
        padding: "0px",
        height: "auto",
        minHeight: "unset",
      },
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[500],
      position: "relative",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[800],
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
      border: `1px solid ${theme.palette.background.main}`,
      padding: "0px",
      borderRadius: "50px",
      overflow: "hidden",
      position: "relative",
    },
    IconContainer: {
      height: "50px",
      width: "50px",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.background.main,
      color: theme.palette.white.main,
    },
    buttonBackground: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0px",
      right: "0px",
      transition: "0.5s",
      zIndex: "-1",
      background: theme.palette.white.main,
    },
    buttonBackgroundSecondary: {
      width: "0%",
      height: "100%",

      position: "absolute",
      top: "0px",
      left: "0px",
      transition: "0.5s",
      zIndex: "-2",
      background: theme.palette.background.main,
      color: theme.palette.white.main,
    },
    image: {
      height: "100%",
      width: "100%",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
  };
});

const HrPayrollBanner = () => {
  const {
    container,
    subContainer,
    ImageContainer,
    contentContainer,
    innerDivider,
    divider,
    button,
    IconContainer,
    buttonBackground,
    buttonBackgroundSecondary,
    image,
  } = useStyle();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <Box sx={{ width: "100%", maxWidth: "450px" }}>
            <Fade direction="up" duration={1000} triggerOnce >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Cloud HR & Payroll Software with Employee Self Service Portal
              </Typography>
            </Fade>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "450px" }}>
            <Box className={divider}>
              <Box className={innerDivider}></Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "550px" }}>
            <Fade duration={1500} direction="up" triggerOnce > 

            <Typography>
              Fast, Accurate, Anywhere. Everything you need in one Package. Team
              Suite, is a new age Human Capital Management Solution combining
              strengths of Cloud and Mobility. Team Suite is fully scalable HR
              Solution and aims to bring a change in the working dynamics of HR
              department.
            </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade duration={2000} direction="up" triggerOnce > 
            <Button className={`${button} HRpayrollButton`}>
              <Typography color={"inherit"} sx={{ padding: "0px 10px" }}>
                Learn More
              </Typography>
              <Box className={IconContainer}>
                <ChevronRightIcon color="inherit" />
              </Box>
              <Box
                className={`${buttonBackground} HRpayrollPrimaryBackground`}
              ></Box>
              <Box
                className={`${buttonBackgroundSecondary} HrpayrollSecondaryBackground`}
              ></Box>
            </Button>
            </Fade>
          </Box>
        </Box>
        <Box className={ImageContainer}>
          <Slide direction="right" duration={2000} triggerOnce>
            <Image
              src={hrpayroll}
              alt={"hrpayroll"}
              className={image}
              style={{ marginTop: "50px" }}
            />
          </Slide>
        </Box>
      </Box>
    </Box>
  );
};

export default HrPayrollBanner;