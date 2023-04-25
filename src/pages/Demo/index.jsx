import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import TopBanner from "@/Components/TopBanner/TopBanner";

import { Fade } from "react-awesome-reveal";
import Blogs from "@/Components/Product/Blogs/Blogs";
import NewsLatter from "@/Components/LandingPage/NewsLatter/NewsLatter";
import ContactUsBanner from "@/Components/LandingPage/ContactusBanner/ContactUsBanner";
import DemoBanner from "@/Components/Demo/DemoBanner";
import DemoForm from "@/Components/Demo/DemoForm";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      padding: "40px 0px",
      alignItems: "center",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      textAlign: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: "750px",
    },
  };
});

const Demo = () => {
  const { container, subContainer, headingContainer, contentContainer } =
    useStyle();
  return (
    <Box>
      <TopBanner
        title={"A comprehensive HR System"}
        desc={"Delivers both flexibility and value for money"}
        activePage={"Demo"}
      />
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography variant="h3">
                Unlocking the full potential of your workforce with strategic
                HRM solutions 
              </Typography>
            </Fade>
            <Box className={"customdivider"}></Box>
          </Box>
        </Box>
      </Box>

      <DemoBanner />
      <DemoForm />
      <Blogs />
      <NewsLatter />
      <ContactUsBanner />
    </Box>
  );
};

export default Demo;
