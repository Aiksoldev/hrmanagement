import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import service from "../../Assets/services/service.png";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Fade } from "react-awesome-reveal";
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
    "A single, integrated cloud-based platform for all your people's needs, from recruitment and training to management.",
    "Consolidate your work processes and streamline your HR operations with our all-in-one HR software. With our reliable notification tools and automated workflows, you can easily manage your entire workflow in one place, saving you time and hassle.",
    "Empower your HR operations with our customizable HRMS software, designed to meet your specific needs. With a range of features and modules, including onboarding, document management, reporting, applicant tracking, and absence and time management, our software provides total flexibility and customization.",
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={imageContainer}>
          <Image src={service} alt={""} className={image} />
        </Box>
        <Box className={contentContainer}>
          <Box>
            <Fade duration={1000} direction="up" triggerOnce >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Flexible, fully customizable HR software
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {data?.map((desc, i) => {
              return (
                <Box key={i} className={descContainer}>
                  <CheckCircleIcon color="primary" />
                  <Fade duration={500*(i+1)} direction="up" triggerOnce >
                    <Typography>{desc}</Typography>
                  </Fade>
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
