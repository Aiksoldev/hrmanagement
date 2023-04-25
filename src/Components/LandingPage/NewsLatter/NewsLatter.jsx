import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React, { useState } from "react";
import newslatter from "../../../Assets/newslatter.png";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      background: theme.palette.background.main,
      color: theme.palette.white.main,
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "center",
      alignItems: "center",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      textAlign: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      gap: "20px",
      padding: "50px 0px",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentBox: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "left",
    },
    imageContainer: {
      width: "100%",

      height: "50vh",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      textAlign: "left",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    image: {
      width: "auto",
      height: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    button: {
      background: theme.palette.white.main,
      padding: "15px 30px",
      borderRadius: "30px",
      color: theme.palette.grey[900],
    },
  };
});

const NewsLatter = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    contentBox,
    imageContainer,
    card,
    image,
    button,
  } = useStyle();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <form className={contentBox} onSubmit={handleSubmit}>
            <Box>
              <Fade direction="up" duration={1000} triggerOnce>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  Subscribe our Newsletter
                </Typography>
              </Fade>
            </Box>

            <Box className={"customdivider"} />
            <Box>
              <Fade direction="up" duration={1000} triggerOnce>
                <Typography color={"inherit"}>
                  Sign up for our newsletter to stay informed about our products
                  and services.
                </Typography>
              </Fade>
            </Box>
            <Box>
              <FormControl
                fullWidth
                sx={{
                  border: (theme) => `2px solid ${theme.palette.white.main}`,
                  borderRadius: "100px",
                  width: "100%",
                }}
              >
                <InputBase
                  fullWidth
                  sx={{
                    padding: "15px",
                    color: "white !important",
                    width: "100%",
                  }}
                  placeholder="Enter Your Business Email"
                  type="email"
                  required
                />
              </FormControl>
            </Box>
            <Box>
              <Button variant="contained" type="submit" className={button}>
                Subscribe Now
              </Button>
            </Box>
          </form>
          <Box className={imageContainer}>
            <Slide direction="right" duration={1500} triggerOnce>
              <Image
                src={newslatter}
                alt=""
                className={`${image} bouncingimg`}
              />
            </Slide>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsLatter;
