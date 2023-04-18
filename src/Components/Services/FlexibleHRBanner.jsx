import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import service from "../../Assets/services/service.png";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      overflow: "hidden",
      minHeight: "80vh",
      background: "url(./servicebg.png)",
      backgroundPosition: "center left",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      justifyItems: "space-evenly",
      
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",

      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    imageContainer: {
      width: "100%",
    },
    contentContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: "20px",
    },
    image: {
      height: "auto",
      width: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "100%",
      },
    },
    descContainer: {
      display: "flex",
      gap: "10px",
    },
  };
});

const FlexibleHRBanner = () => {
  const {
    container,
    subContainer,
    contentContainer,
    imageContainer,
    image,
    descContainer,
  } = useStyle();
  const [data] = useState([
    "One unified cloud platform to recruit, train, and manage people",
    "Manage your entire work flow in one place with reliable notification tools, build automated process that will save you time and hassle",
    "From onboarding, document management, reporting, applicant tracking, absence and time management, Make Team Suite work for your specific needs with total flexibility and customization",
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={imageContainer}>
          <Image src={service} alt={""} className={image} />
        </Box>
        <Box className={contentContainer}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Flexible, fully customizable HR software
            </Typography>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {data?.map((desc, i) => {
              return (
                <Box key={i} className={descContainer}>
                  <CheckCircleIcon color="primary" />
                  <Typography>{desc}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FlexibleHRBanner;
