import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import TopBanner from "@/Components/TopBanner/TopBanner";

import { Fade } from "react-awesome-reveal";
import ProductBanner from "@/Components/Product/ProductBanner/ProductBanner";
import ProductFeatures from "@/Components/Product/ProductFeatures/ProductFeatures";


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

const Product = () => {
  const { container, subContainer, headingContainer, contentContainer } =
    useStyle();
  return (
    <Box>
      <TopBanner
        title={"Enabling HR Teams to Do More"}
        desc={
          " Manage your employees effortlessly, Right from Recruitment Till Retirement"
        }
        activePage={"Product"}
      />
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography variant="h3">
                Feature rich Payroll made so simple. You&apos;ll feel in
                control.
              </Typography>
            </Fade>
            <Box className={"customdivider"}></Box>
          </Box>
        </Box>
      </Box>
      <ProductBanner />
      <ProductFeatures />
    </Box>
  );
};

export default Product;
