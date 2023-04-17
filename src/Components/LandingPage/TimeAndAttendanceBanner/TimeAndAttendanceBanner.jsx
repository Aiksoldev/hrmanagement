import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 20px",
      background: `url(https://www.teamsuite.app/images/icons/pattern-10.png)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center right",
      color: theme.palette.grey[700],
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      gap: "200px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "20px",
      },
    },
    contentContainer: {
    
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },
    ImageContainer: {
    
      position: "relative",
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
    FreeIcons: {
      position: "absolute",
    },
  };
});

const TimeAndAttendanceBanner = () => {
  const {
    container,
    subContainer,
    contentContainer,
    ImageContainer,
    button,
    IconContainer,
    buttonBackground,
    buttonBackgroundSecondary,
    FreeIcons,
  } = useStyle();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Slide duration={1500} direction="right" triggerOnce>
          <Box className={contentContainer}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Time, Attendance
              </Typography>
            </Box>
            <Box sx={{ width: "100%", maxWidth: "500px" }}>
              <Typography>
                ntegrate any device of your choice biometric or face
                recognition. Geo-restricted attendance is another option for
                your ease. Monitor daily time on your smartphone.
              </Typography>
            </Box>
            <Box>
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
            </Box>
          </Box>
        </Slide>
        <Slide duration={1500} direction="left" triggerOnce>
          <Box className={ImageContainer}>
            <Image
              src={
                "https://www.teamsuite.app/images/resource/time-attendane.png"
              }
              height={700}
              width={700}
              alt={""}
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              className={`${FreeIcons} rotationAnimation`}
              sx={{ top: 0, left: 20 }}
            >
              <Image
                src={"https://www.teamsuite.app/images/icons/anim-icon-6.png"}
                alt={""}
                height={20}
                width={20}
              />
            </Box>
            <Box
              className={`${FreeIcons} rotationAnimation`}
              sx={{ bottom: 0, left: 20 }}
            >
              <Image
                src={"https://www.teamsuite.app/images/icons/anim-icon-5.png"}
                alt={""}
                height={20}
                width={20}
              />
            </Box>
            <Box
              className={`${FreeIcons} rotationAnimation`}
              sx={{ top: 0, right: 20 }}
            >
              <Image
                src={"https://www.teamsuite.app/images/icons/anim-icon-4.png"}
                alt={""}
                height={20}
                width={20}
              />
            </Box>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default TimeAndAttendanceBanner;
