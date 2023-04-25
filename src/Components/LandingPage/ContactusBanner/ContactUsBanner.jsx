import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import contact from "../../../Assets/contact.png";
import logo1 from "../../../Assets/logo.png";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Slide } from "react-awesome-reveal";
import { useRouter } from "next/router";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 10px",
      [theme.breakpoints.down("md")]: {
        padding: "10px",
      },
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    ContentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
    },
    iconsContainer: {
      display: "flex",
      gap: "20px",
      color: theme.palette.grey[500],
    },
    iconButton: {
      transition: "0.5s",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  };
});

const ContactUsBanner = () => {
  const {
    container,
    subContainer,
    imageContainer,
    ContentContainer,
    iconsContainer,
    iconButton,
  } = useStyle();
  const router = useRouter();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Slide
          direction="left"
          duration={1500}
          triggerOnce
          style={{ width: "100%" }}
        >
          <Box className={imageContainer}>
            <Box sx={{ width: "100%" }}>
              <Image
                src={contact}
                alt={""}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{ padding: "10px 30px", borderRadius: "50px" }}
              onClick={() => router.push("/Demo")}
            >
              Request A Demo
            </Button>
          </Box>
        </Slide>
        <Slide
          direction="right"
          duration={2000}
          triggerOnce
          style={{ width: "100%" }}
        >
          <Box className={ContentContainer}>
            <Image
              src={logo1}
              alt=""
              style={{ width: "150px", height: "auto" }}
            />
            <Box>
              <Typography>© 2023 Team Aiksol. All rights reserved</Typography>
            </Box>
            <Box className={iconsContainer}>
              <IconButton className={iconButton}>
                <LinkedInIcon color="inherit" />
              </IconButton>
              <IconButton className={iconButton}>
                <GoogleIcon color={"inherit"} />
              </IconButton>
              <IconButton className={iconButton}>
                <TwitterIcon color={"inherit"} />
              </IconButton>
              <IconButton className={iconButton}>
                <InstagramIcon color={"inherit"} />
              </IconButton>
              <IconButton className={iconButton}>
                <FacebookIcon color={"inherit"} />
              </IconButton>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default ContactUsBanner;
