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
                HRM software provides a comprehensive HR management solution:
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography>
                With our software, you can easily manage employee data, such as
                personal information, job information, and salary information,
                and generate reports on this data. Our recruitment management
                module helps streamline the hiring process, from job posting to
                candidate selection, and our performance management module helps
                manage employee performance and provide feedback and coaching.
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade direction="up" duration={2000} triggerOnce>
              <Typography>
                Our software also includes a training and development module
                that allows you to create training plans and manage employee
                training, and a leave management module that helps track
                employee leave and calculate leave balances. With our HRM
                software, you can streamline your HR processes and make better,
                data-driven decisions about your workforce.
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
