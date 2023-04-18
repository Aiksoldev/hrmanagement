import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import OnBoardingBanner from "../OnBoardingBanner/OnBoardingBanner";
import TimeAndAttendanceBanner from "../TimeAndAttendanceBanner/TimeAndAttendanceBanner";
import LeaveManagement from "../LeaveManagement/LeaveManagement";
import { Fade } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0px 20px",
      marginTop: "-20px",
      [theme.breakpoints.down("md")]: {
        padding: "10px",
      },
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[500],
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[800],
    },
    Typo: {
      color: theme.palette.grey[600],
    },
  };
});

const PayrollSoftwareSection = () => {
  const {
    container,
    subContainer,
    headingContainer,
    divider,
    innerDivider,
    Typo,
  } = useStyle();
  return (
    <>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade duration={1000} direction="up" triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Streamline Your HR Processes with Our Solution
              </Typography>
            </Fade>
            <Box>
              <Box className={divider}>
                <Box className={innerDivider}></Box>
              </Box>
            </Box>
            <Box>
              <Fade duration={1500} direction="up" triggerOnce>
                <Typography variant="h5" className={Typo}>
                  Take your HR management to the next level with our
                  comprehensive solution
                </Typography>
              </Fade>
              <Fade duration={2000} direction="up" triggerOnce>
                <Typography className={Typo}>
                  designed for modern businesses. You&apos;ll have the tools you
                  need to manage your HR functions seamlessly.
                </Typography>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <OnBoardingBanner />
        <TimeAndAttendanceBanner />
        <LeaveManagement />
      </Box>
    </>
  );
};

export default PayrollSoftwareSection;
