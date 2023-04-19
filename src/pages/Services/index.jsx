import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import TopBanner from "@/Components/TopBanner/TopBanner";

import { Fade } from "react-awesome-reveal";
import HCMBanner from "@/Components/Product/HCMBanner/HCMBanner";
import Blogs from "@/Components/Product/Blogs/Blogs";
import NewsLatter from "@/Components/LandingPage/NewsLatter/NewsLatter";
import ContactUsBanner from "@/Components/LandingPage/ContactusBanner/ContactUsBanner";
import ProductServices from "@/Components/Services/ProductServices";
import WhyHRM from "@/Components/Services/WhyHRM";
import ProductCharactestics from "@/Components/Services/ProductCharactestics";
import FlexibleHRBanner from "@/Components/Services/FlexibleHRBanner";
import CompleteHRSystemBanner from "@/Components/Services/CompleteHRSystemBanner";

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

const Services = () => {
  const { container, subContainer, headingContainer, contentContainer } =
    useStyle();
  return (
    <Box>
      <TopBanner
        title={"Time Efficient & Cost Effective"}
        desc={
          "Combination of HR software & consultancy makes managing your people easy, time efficient and cost effective."
        }
        activePage={"Services"}
      />
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography variant="h3">New-Age Paperless HCM</Typography>
            </Fade>
            <Box className={"customdivider"}></Box>
            <Box>
              <Typography>HRM Software brings you the Best</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <ProductServices />
      <WhyHRM />
      <FlexibleHRBanner />
      <CompleteHRSystemBanner />
      <Blogs />
      <NewsLatter />
      <ContactUsBanner />
    </Box>
  );
};

export default Services;
