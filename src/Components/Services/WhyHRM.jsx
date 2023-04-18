import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import WhyHRMCard from "../Cards/WhyHRMCard";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import ProductCharactestics from "./ProductCharactestics";
const useStyle = makeStyles((theme) => {
  return {
    parentBox: {
      background: "url(./bgwaves.png)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
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

const WhyHRM = () => {
  const {
    parentBox,
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
    <Box className={parentBox}>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={contentContainer}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Why TeamSuite
              </Typography>
            </Box>
            <Box className={"customdivider"}></Box>
            <Box>
              <Typography>Decision to Choose Team Suite is easy</Typography>
            </Box>
            <Box>
              <Button className={`${button} HRpayrollButton`}>
                <Typography
                  color={"inherit"}
                  sx={{ padding: "0px 10px", zIndex: "10" }}
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
            </Box>
          </Box>
          <Box className={imageContainer}>
            <Box className={singleImageContainer}>
              <WhyHRMCard
                data={{
                  icon: (
                    <IntegrationInstructionsIcon
                      color="primary"
                      sx={{ fontSize: "55px" }}
                    />
                  ),
                  title: "Integrated MS Power BI and intelligent dashboards",
                }}
              />
              <WhyHRMCard
                data={{
                  icon: (
                    <RocketLaunchIcon
                      color="primary"
                      sx={{ fontSize: "55px" }}
                    />
                  ),
                  title: "Continuous Product Innovation",
                }}
              />
              <WhyHRMCard
                data={{
                  icon: (
                    <SettingsSuggestIcon
                      color="primary"
                      sx={{ fontSize: "55px" }}
                    />
                  ),
                  title: "Excellent and Efficient Support Systems",
                }}
              />
            </Box>
            <Box className={imagesBox}>
              <WhyHRMCard
                data={{
                  icon: (
                    <ThumbUpAltIcon color="primary" sx={{ fontSize: "55px" }} />
                  ),
                  title:
                    "Proven Implementation Methodology which ensures Project Success",
                }}
              />
              <WhyHRMCard
                data={{
                  icon: (
                    <CloudSyncIcon color="primary" sx={{ fontSize: "55px" }} />
                  ),
                  title:
                    "Leading HR Software as a Service for Cloud and on Premise",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ProductCharactestics />
    </Box>
  );
};

export default WhyHRM;
