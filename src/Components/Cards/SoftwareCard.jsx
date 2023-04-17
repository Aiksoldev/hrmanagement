import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      minHeight: "200px",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "space-between",
      color: theme.palette.grey[700],
      transition: "0.5s",
      borderRadius: "20px",
      overflow: "hidden",
      position: "relative",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "&:hover": {
        transform: "scale(1.03)",
      },
    },
    background: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: "-1",
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
  };
});

const SoftwareCard = ({ data }) => {
  const { container, background, leftSection, rightSection } = useStyle();
  return (
    <Box className={`${container} PayrollCards`}>
      <Box>{data?.icon}</Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {data?.title}
        </Typography>
      </Box>
      <Divider sx={{ width: "40px" }} />
      <Box>
        <Typography>{data?.desc}</Typography>
      </Box>
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

export default SoftwareCard;
