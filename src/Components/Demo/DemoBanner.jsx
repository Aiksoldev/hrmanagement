import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DemoBannerCard from "@/Components/Cards/DemoBannerCard";
import data from "../../Assets/products/data.png";
import access from "../../Assets/products/access.png";
import rights from "../../Assets/products/rights.png";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 10px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentContainer: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    imageContainer: {
      width: "100%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    singleImageContainer: {
      width: "100%",
    },
    imagesBox: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
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
      "&:hover": {
        color: theme.palette.white.main,
      },
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
      zIndex: "-1",
      background: theme.palette.background.main,
      color: theme.palette.white.main,
    },
  };
});

const DemoBanner = () => {
  const {
    container,
    subContainer,
    contentContainer,
    imageContainer,
    singleImageContainer,
    imagesBox,
    button,
    IconContainer,
    buttonBackground,
    buttonBackgroundSecondary,
  } = useStyle();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <Box>
            <Fade duration={1000} direction="up" triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                The Right Features
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box>
            <Fade duration={1200} direction="up" triggerOnce>
              <Typography>Experience the Difference.</Typography>
            </Fade>
          </Box>
          <Box>
            <Fade triggerOnce duration={1500} direction="up">
              <Button className={`${button} HRpayrollButton`}>
                <Typography
                  color={"inherit"}
                  sx={{ padding: "0px 20px", zIndex: "10" }}
                >
                  Read More
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
        <Box className={imageContainer}>
          <Fade
            duration={1500}
            direction="right"
            triggerOnce
            style={{ width: "100%" }}
          >
            <Box className={singleImageContainer}>
              <DemoBannerCard
                data={{
                  desc: "A completely transformed, Team Suite supports you, your executives, managers and employees' individualized user experience that is immersive, engaging, and intuitive.",
                  title: "User Experience",
                }}
              />
              <DemoBannerCard
                data={{
                  desc: "HRMS, a complete HR all-in-one solution is available whereever your employees are. We let you change colors, images, settings and theme matches your organization the best.",
                  title: "Mobile Ready",
                }}
              />
            </Box>
          </Fade>
          <Fade
            duration={2000}
            direction="right"
            triggerOnce
            style={{ width: "100%" }}
          >
            <Box className={imagesBox}>
              <DemoBannerCard
                data={{
                  desc: "Your employees determine your success, It's time to unlock their full potential. Our HR software facilitates to effectively process critical payroll, recruitment time & absence.",
                  title: "Engagement",
                }}
              />
              <DemoBannerCard
                data={{
                  desc: "Customizable, parameterized reports available for Analytics that’s Fast and can be exported to excel, PDF, etc. Get now and Unlock the Power of Employee Data with HR Dashboards & Reporting.",
                  title: "Detailed Reports",
                }}
              />
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoBanner;
