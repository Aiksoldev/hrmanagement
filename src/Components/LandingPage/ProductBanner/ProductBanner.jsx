import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import software1 from "../../../Assets/software1.png";
import mobile1 from "../../../Assets/mobile1.png";
import Image from "next/image";
import HrPayrollBanner from "../HrPayrollBanner/HrPayrollBanner";
import { Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    parentBox: {
      background: "url(https://www.teamsuite.app/images/icons/pattern-7.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      padding: "50px 0px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      padding: "20px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "20px",
        padding:'10px'
      },
    },
    ImageContainer: {
      width: "40%",
      marginLeft: "-100px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginLeft: 0,
      },
    },
    contentContainer: {
      width: "100%",

      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  };
});

const ProductBanner = () => {
  const {
    parentBox,
    container,
    subContainer,
    ImageContainer,
    contentContainer,
  } = useStyle();
  return (
    <Box className={parentBox}>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={contentContainer}>
            <Slide direction="left" duration={2000} triggerOnce>
              <Image
                src={software1}
                alt={"hr"}
                quality={100}
                style={{ width: "100%", height: "80%" }}
              />
            </Slide>
          </Box>
          <Box className={ImageContainer}>
            <Slide direction="right" duration={2500} triggerOnce>
              <Image
                src={mobile1}
                alt={"hr"}
                quality={100}
                style={{ width: "100%", height: "100%" }}
              />
            </Slide>
          </Box>
        </Box>
      </Box>
      <HrPayrollBanner />
    </Box>
  );
};

export default ProductBanner;
