import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      minHeight: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "20px",
      transition: "0.5s",
      // padding:'40px 0px',
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      position: "relative",
      overflow: "hidden",
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: "-2",
      display: "flex",
    },
    leftSection: {
      width: "100%",
      transition: "0.5s",

      height: "100%",
      position: "relative",
      display: "flex",
    },
    rightSection: {
      width: "100%",
      transition: "0.5s",

      height: "100%",
      position: "relative",
      display: "flex",
    },
    IconContainer: {
      height: "50px",

      width: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px dashed ${theme.palette.grey[200]}`,
      zIndex: "10",
    },
    iconSection: {
      position: "relative",
      paddingTop: "50px",
      color: theme.palette.white.main,
    },
    ColoredBackgroundBox: {
      height: "80px",
      width: "80px",
      background: theme.palette.background.main,
      position: "absolute",
      borderRadius: "10px",
      top: "72%",
      left: "50%",
      transform: "translate(-50%,-50%) rotate(-45deg)",
      zIndex: "-1",
      transition: "0.5s",
    },
    ColoredBackgroundBox2: {
      height: "80px",
      width: "80px",
      border: `1px dashed ${theme.palette.background.main}`,
      position: "absolute",
      borderRadius: "10px",
      top: "72%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: "-1",
    },
  };
});

const ProductFeaturesCard = ({ data }) => {
  const {
    container,
    background,
    leftSection,
    rightSection,
    IconContainer,
    iconSection,
    ColoredBackgroundBox,
    ColoredBackgroundBox2,
  } = useStyle();
  return (
    <Box className={`${container} PayrollCards`}>
      <Box className={iconSection}>
        <Box className={`${ColoredBackgroundBox} featureBackground`}></Box>
        <Box className={ColoredBackgroundBox2}></Box>
        <Box className={IconContainer}>{data?.icon}</Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", paddingTop: "40px" }}
        >
          {data?.title}
        </Typography>
      </Box>
      <Divider sx={{ width: "40px",height:'2px' }} />

      <Box className={background}>
        <Box className={rightSection}>
          <Box className={`rightbackground rightbackground1`}></Box>
          <Box className={`leftbackground rightbackground1`}></Box>
        </Box>
        <Box className={leftSection}>
          <Box className={`rightbackground rightbackground1`}></Box>
          <Box className={`leftbackground rightbackground1`}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFeaturesCard;
