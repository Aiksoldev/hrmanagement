import BenefitAndFeature from "@/Components/LandingPage/BenifitAndFeature/BenefitAndFeature";
import ContactUsBanner from "@/Components/LandingPage/ContactusBanner/ContactUsBanner";
import FreeAndFastSupport from "@/Components/LandingPage/FreeAndFastSupport/FreeAndFastSupport";
import HeroSection from "@/Components/LandingPage/HeroSection/HeroSection";
import LeaveManagement from "@/Components/LandingPage/LeaveManagement/LeaveManagement";
import NewsLatter from "@/Components/LandingPage/NewsLatter/NewsLatter";
import Num1PayrollSection from "@/Components/LandingPage/Num1Payroll/Num1PayrollSection";
import OnBoardingBanner from "@/Components/LandingPage/OnBoardingBanner/OnBoardingBanner";
import PayrollMobileBanner from "@/Components/LandingPage/PayrollMobileBanner/PayrollMobileBanner";
import PayrollSoftwareSection from "@/Components/LandingPage/PayrollSoftwareSection/PayrollSoftwareSection";
import ProductBanner from "@/Components/LandingPage/ProductBanner/ProductBanner";
import TimeAndAttendanceBanner from "@/Components/LandingPage/TimeAndAttendanceBanner/TimeAndAttendanceBanner";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
    },
  };
});

const LandingPage = () => {
  const { container } = useStyle();
  return (
    <Box className={container}>
      <HeroSection />
      <PayrollMobileBanner />
      <ProductBanner />
      <PayrollSoftwareSection />
      <Num1PayrollSection />
      <BenefitAndFeature />
      <FreeAndFastSupport />
      <NewsLatter />
      <ContactUsBanner />
    </Box>
  );
};

export default LandingPage;
