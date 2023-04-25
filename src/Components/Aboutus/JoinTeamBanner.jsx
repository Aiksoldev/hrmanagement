import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import about from "../../Assets/aboutus/about.png";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px 10px",
      marginTop: "20px",
      overflow: "hidden",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      justifyItems: "space-evenly",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row-reverse",
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
  };
});

const JoinTeamBanner = () => {
  const { container, subContainer, contentContainer, imageContainer, image } =
    useStyle();

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={imageContainer}>
          <Slide direction="right" duration={1500} triggerOnce>
            <Image src={about} alt={""} className={image} />
          </Slide>
        </Box>
        <Box className={contentContainer}>
          <Box>
            <Fade direction="up" duration={1000} triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                HRMS, Better HR for All
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Fade direction="up" duration={1200} triggerOnce>
              <Typography>
                At HRMS, we understand that managing your employees can be a
                time-consuming and challenging task. That&apos;s why we offer
                paperless onboarding that takes care of your entire team, all in
                one place. With our software, you can automate employee
                onboarding and separation, using smart-fill forms, automated
                tasks, and follow-up approvals. This not only saves you time,
                but also helps to decrease the risk of errors and ensures
                compliance with regulations.
              </Typography>
            </Fade>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography>
                Our team of experienced professionals knows that every business
                has unique HR requirements, which is why we provide customised
                human resource solutions that work well for your company and
                your employees.
              </Typography>
            </Fade>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography>
                At HRMS, we take care of the HR management, so you can focus on
                growing your business. Our software is designed to be
                easy-to-use and highly intuitive, ensuring that you can get the
                most out of your HR operations with minimal hassle. Contact us
                today to learn more about how we can help you manage your
                workforce and drive your business forward.
              </Typography>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinTeamBanner;
