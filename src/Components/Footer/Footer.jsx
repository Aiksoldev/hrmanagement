import {
  Box,
  Button,
  Divider,
  InputBase,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Logo from "../../Assets/Footer/Logo.png";
import Appstore from "../../Assets/Footer/Appstore.png";
import playstore from "../../Assets/Footer/playstore.png";
import Image from "next/image";
import Link from "next/link";
import { FooterLinks } from "@/Resources/FooterLinks";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.background.main,
    },
    subContainer: {
      width: "100%",
      maxWidth: "1440px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      color: theme.palette.white.main,
    },
    logoContainer: {
      width: "100%",
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    appstoreContainer: {
      display: "flex",
      gap: "20px",
    },
    images: {
      width: "100%",
      maxWidth: "180px",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "unset",
        width: "45%",
      },
    },
    divider: {
      width: "100%",
      height: "2px",
      background: theme.palette.grey[500],
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    footerLinkContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      alignItems: "center",
    },
    phoneNumberContainer: {
      width: "50%",
      color: theme.palette.text.secondary,
      display: "flex",
      alignItems: "center",
      justifyContent: "end",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "start",
      },
    },
    NewsLatterContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: theme.palette.grey[200],
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    textField: {
      display: "flex",
      border: `1px solid ${theme.palette.grey[300]}`,
      overflow: "hidden",
      borderRadius: "50px",
      width: "100%",
      maxWidth: "450px",
      background: theme.palette.white.main,
    },
  };
});

const Footer = () => {
  const {
    container,
    subContainer,
    logoContainer,
    appstoreContainer,
    images,
    divider,
    contentContainer,
    footerLinkContainer,
    phoneNumberContainer,
    NewsLatterContainer,
    textField,
  } = useStyle();

  return (
    <Box>
      <Box className={NewsLatterContainer}>
        <Typography sx={{ fontWeight: "bold" }}>
          Get a free subscription to our health and fitness tip and stay tuned
          to our latest offers
        </Typography>
        <Box className={textField}>
          <InputBase
            placeholder="Type Your Email"
            sx={{ padding: " 5px 20px", width: "100%" }}
          />
          <Button variant="contained" sx={{ padding: "10px 30px" }}>
            Submit
          </Button>
        </Box>
      </Box>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={logoContainer}>
            <Box>
              <Image
                src={Logo}
                alt={"medy"}
                quality={100}
                style={{ width: "100%", height: "100%", minWidth: "180px" }}
              />
            </Box>
            <Box className={appstoreContainer}>
              <Image
                src={Appstore}
                alt="medy mobile application"
                className={images}
              />
              <Image
                src={playstore}
                alt="medy mobile application"
                className={images}
              />
            </Box>
          </Box>
          <Divider className={divider} />
          <Box className={contentContainer}>
            <Box className={footerLinkContainer}>
              {FooterLinks?.map((data, i) => {
                return (
                  <Link key={i} href={data?.link}>
                    <Typography>{data?.title}</Typography>
                  </Link>
                );
              })}
            </Box>
            <Box className={phoneNumberContainer}>
              <Typography variant="h3">800 6339 (800-Medy)</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
