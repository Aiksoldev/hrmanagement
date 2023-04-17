import { Box, Button, InputBase, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import bg from "../../../Assets/bg.png";
import bg2 from "../../../Assets/bg2.png";
import software from "../../../Assets/software.png";
import Image from "next/image";
import { Bounce, Slide } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    subContainer: {
      marginTop: "150px",
      width: "100%",
      maxWidth: "1280px",
      padding: "40px",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "50px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        padding: "10px",
      },
    },
    ContentContainer: {
      width: "100%",
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      // padding: "20px",
    },
    imageContainer: {
      width: "100%",
      position: "relative",
      // padding: "20px",
      [theme.breakpoints.down("md")]: {
        padding: "0px",
      },
    },
    topImage: {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      right: 0,
    },
    bottomImage: {
      width: "800px",
      height: "400px",
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    GradientBox: {
      height: "80px",
      width: "80px",
      borderRadius: "50%",
      position: "absolute",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      background:
        "linear-gradient(155deg, rgba(0,145,191,1) 0%, rgba(0,162,155,1) 100%)",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    searchContainer: {
      width: "100%",
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "space-between",
      border: `1px solid ${theme.palette.background.main}`,
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        borderRadius: "0px",
      },
    },
    button: {
      width: "50%",
      padding: "10px 20px",
      background: theme.palette.background.main,
      whiteSpace: "nowrap",
      color: theme.palette.white.main,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        borderRadius: "0px",
      },
    },
    randomImages: {
      position: "absolute",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  };
});

const HeroSection = () => {
  const {
    container,
    subContainer,
    bottomImage,
    topImage,
    GradientBox,
    ContentContainer,
    imageContainer,
    searchContainer,
    button,
    randomImages,
  } = useStyle();
  const [images] = useState([
    "https://www.teamsuite.app/images/resource/user-3.png",
    "https://www.teamsuite.app/images/resource/user-7.png",
    "https://www.teamsuite.app/images/resource/user-6.png",
    "https://www.teamsuite.app/images/resource/user-5.png",
    "https://www.teamsuite.app/images/resource/user-1.png",
    "https://www.teamsuite.app/images/resource/user-4.png",
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={ContentContainer}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Pakistan&apos;s best rated Payroll Software
          </Typography>
          <Typography variant="h6">Simple, Smart & Affordable</Typography>
          <Box className={searchContainer}>
            <InputBase
              fullWidth
              sx={{ padding: "5px 10px", height: "100%" }}
              placeholder="Request A Demo"
            />
            <Button className={button}>Request A Demo</Button>
          </Box>
        </Box>
        <Box className={imageContainer}>
          <Image
            src={software}
            alt={"software"}
            style={{ width: "100%", height: "auto" }}
          />
          {images?.map((data, i) => {
            return (
              <Box
                key={i}
                className={`${randomImages} bouncingdiv`}
                sx={{
                  top: Math.ceil(Math.random() * 640) * i,
                  left: Math.ceil(Math.random() * 1280),
                }}
              >
                <Image src={data} alt={data} height={80} width={80} />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={topImage}>
        <Slide direction="right" triggerOnce>
          <Image src={bg} alt="bg" style={{ width: "100%" }} />
        </Slide>
      </Box>
      <Box className={bottomImage}>
        <Slide direction="left" triggerOnce>
          <Image src={bg2} alt="bg" style={{ width: "100%" }} />
        </Slide>
      </Box>

      <Box
        className={`${GradientBox} bouncingdiv`}
        sx={{ bottom: "100px", left: "100px" }}
      ></Box>

      <Box
        className={`${GradientBox} bouncingdiv`}
        sx={{ top: "100px", left: "200px" }}
      ></Box>
    </Box>
  );
};

export default HeroSection;