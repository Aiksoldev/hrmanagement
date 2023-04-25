import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import software2 from "../../../Assets/software2.png";
import bgdots from "../../../Assets/bgdots.png";
import Image from "next/image";
import { useRouter } from "next/router";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      padding: "50px 0px",
      position: "relative",
      background: theme.palette.grey[100],
      overflow: "hidden",
    },
    subContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
      gap: "20px",
      zIndex: 1,
      padding: "50px 10px",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    ImageContainer: {
      width: "100%",
      zIndex: 1,
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    contentBox: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    img: {
      width: "100%",
      height: "100%",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "100%",
      },
    },
    blob1: {
      height: "450px",
      width: "450px",
      borderRadius: "100%",
      position: "absolute",
      top: "-225px",
      left: "-225px",
      background: theme.palette.background.main,
    },
    blob2: {
      height: "450px",
      width: "450px",
      borderRadius: "100%",
      position: "absolute",
      bottom: "-125px",
      right: "225px",
      background: theme.palette.background.main,
    },
  };
});

const BetterHrForAllSection = () => {
  const {
    container,
    subContainer,
    ImageContainer,
    contentContainer,
    contentBox,
    img,
    blob1,
    blob2,
  } = useStyle();
  const router = useRouter();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <Box className={contentBox}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Better HR for all
              </Typography>
            </Box>
            <Box className={"customdivider"}></Box>
            <Box sx={{ width: "100%", maxWidth: "500px" }}>
              <Typography>
                We help you minimize human capital management risks and
                challenges, and proactively increase productivity. It&apos;s
                what we do!
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ padding: "15px 30px", borderRadius: "50px" }}
                onClick={() => router.push("/Demo")}
              >
                Request A Demo
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className={ImageContainer}>
          <Image src={software2} alt="" className={img} />
        </Box>
      </Box>
      <Box className={`${blob1} bouncingimg`}></Box>
      <Box className={`${blob2} bouncingimg`}></Box>
    </Box>
  );
};

export default BetterHrForAllSection;
