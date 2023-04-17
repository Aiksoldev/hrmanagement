import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import TopBanner from "@/Components/TopBanner/TopBanner";
import HRMFeatures from "@/Components/Features/HRMFeatures/HRMFeatures";
import { Fade } from "react-awesome-reveal";
import PayrollManagementBanner from "@/Components/Features/PayrollManagementBanner/PayrollManagementBanner";
import ExceptionalSupportSection from "@/Components/Features/ExceptionalSupportSection/ExceptionalSupportSection";
import BetterHrForAllSection from "@/Components/Features/BetterHrForAllSection/BetterHrForAllSection";
import NewsLatter from "@/Components/LandingPage/NewsLatter/NewsLatter";
import ContactUsBanner from "@/Components/LandingPage/ContactusBanner/ContactUsBanner";

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

const Features = () => {
  const { container, subContainer, headingContainer, contentContainer } =
    useStyle();
  return (
    <Box>
      <TopBanner
        title={"Customized Payroll Structures"}
        desc={
          "Set your salary structures, payroll cycles and allowance heads based on your organization’s policies and practices."
        }
        activePage={"Features"}
      />
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade direction="up" duration={1000} triggerOnce>
              <Typography color={"primary"}>
                Enterprise Grade Cloud HCM Software
              </Typography>
            </Fade>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography variant="h3">
                Helping Hundreds of
                <br /> Businesses Manage their Employees
              </Typography>
            </Fade>
            <Box className={"customdivider"}></Box>
          </Box>
          <HRMFeatures />
        </Box>
      </Box>
      <PayrollManagementBanner />
      <ExceptionalSupportSection />
      <BetterHrForAllSection />
      <NewsLatter />
      <ContactUsBanner />
    </Box>
  );
};

export default Features;