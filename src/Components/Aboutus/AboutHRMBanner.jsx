import SoftwareCard from "@/Components/Cards/SoftwareCard";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import ab1 from "../../Assets/aboutus/ab1.png";
import ab2 from "../../Assets/aboutus/ab2.png";
import ab3 from "../../Assets/aboutus/ab3.png";
import ab4 from "../../Assets/aboutus/ab4.png";

import FeatureCard from "@/Components/Cards/FeatureCard";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
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
      alignItems: "center",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      padding: "50px 0px",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
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

const AboutHRMBanner = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    divider,
    innerDivider,
    Typo,
  } = useStyle();
  const [cardData] = useState([
    {
      img: ab1,
      title: "Anytime, Anywhere Access",
      desc: "Employee self service at your finger tips",
    },
    {
      img: ab2,
      title: "Simplify Communication",
      desc: "Communicate to employees with ease",
    },
    {
      img: ab3,
      title: "Instant Letter Generation",
      desc: "With one click generate & publish letters",
    },
    {
      img: ab4,
      title: "Smart Attendance with Geo Mark",
      desc: "Mark attendance easily with portable device",
    },
  ]);
  return (
    <>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              More Than Just for you
            </Typography>
            <Box>
              <Box className={divider}>
                <Box className={innerDivider}></Box>
              </Box>
            </Box>
            
          </Box>
          <Box className={contentContainer}>
            {cardData?.map((data, i) => {
              return (
                <Fade
                  duration={500 * (i + 1)}
                  direction="up"
                  key={i}
                  triggerOnce
                >
                  <FeatureCard data={data} />
                </Fade>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutHRMBanner;
