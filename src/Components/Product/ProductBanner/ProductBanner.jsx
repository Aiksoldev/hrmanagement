import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import product from "../../../Assets/product.png";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      overflow: "hidden",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
      padding: "0px 40px 0px 0px",
      [theme.breakpoints.down("md")]: {
        padding: "0px",
      },
    },
    ImageContainer: {
      width: "100%",
    },
    img: {
      width: "auto",
      height: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "100%",
      },
    },
  };
});

const ProductBanner = () => {
  const { container, subContainer, ImageContainer, contentContainer, img } =
    useStyle();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <Box>
            <Fade direction="up" duration={1000} triggerOnce>
              <Typography
                variant="h3"
                color={"primary"}
                sx={{ fontWeight: "bold" }}
              >
                TeamSuite the easiest and comprehensive Payroll software for
                Pakistan.
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography>
                Team Suite, HCM Software has everything you need to manage
                Payroll and HR including attendance, loan, bonus, gratuity,
                expense, full & final settlement, and statutory & compliance
                reports.
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade direction="up" duration={2000} triggerOnce>
              <Typography>
                Team Suite integrated with all available Fingerprint, Face Based
                Biometric & RFID Proximity Reader Attendance Machine made simple
                with seamless automation for employee time & attendance
                management. Our own integrated application has custom rules to
                manage attendance devices.
              </Typography>
            </Fade>
          </Box>
        </Box>
        <Box className={ImageContainer}>
          <Slide direction="right" duration={1000} triggerOnce>
            <Image src={product} alt={""} className={img} />
          </Slide>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductBanner;
