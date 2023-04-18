import { Box } from "@mui/material";
import React from "react";
import TopBanner from "@/Components/TopBanner/TopBanner";
import Blogs from "@/Components/Product/Blogs/Blogs";
import NewsLatter from "@/Components/LandingPage/NewsLatter/NewsLatter";
import ContactUsBanner from "@/Components/LandingPage/ContactusBanner/ContactUsBanner";
import JoinTeamBanner from "@/Components/Aboutus/JoinTeamBanner";
import ProductBanner from "@/Components/LandingPage/ProductBanner/ProductBanner";
import AboutHRMBanner from "@/Components/Aboutus/AboutHRMBanner";
import AdvantageBanner from "@/Components/Aboutus/AdvantageBanner";

const Aboutus = () => {
  return (
    <Box>
      <TopBanner
        title={"Time Efficient & Cost Effective"}
        desc={
          "Combination of HR software & consultancy makes managing your people easy, time efficient and cost effective."
        }
        activePage={"About Us"}
      />

      <JoinTeamBanner />
      <ProductBanner />
      <AboutHRMBanner />
      <AdvantageBanner />
      <Blogs />
      <NewsLatter />
      <ContactUsBanner />
    </Box>
  );
};

export default Aboutus;
