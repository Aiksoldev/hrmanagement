import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      minHeight: "300px",
      padding: "50px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      color: theme.palette.grey[500],
      borderRadius: "20px",
      position: "relative",
      overflow: "hidden",
      transition: "0.5s",
      "&:hover": {
        color: theme.palette.grey[900],
        cursor: "pointer",
      },
    },

    iconContainer: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
    },
    blob1: {
      height: "80px",
      position: "absolute",
      width: "80px",
      zIndex: "2",
      borderRadius: "100%",
      background: theme.palette.grey[50],
    },
    blob2: {
      height: "150px",
      width: "150px",
      position: "absolute",
      zIndex: "1",
      borderRadius: "100%",
      background: theme.palette.grey[100],
    },
    blob3: {
      height: "250px",
      width: "250px",
      zIndex: "",
      position: "absolute",
      borderRadius: "100%",
      background: theme.palette.grey[200],
    },
    blobContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "20px",
      right: "20px",
    },
  };
});

const CharacteristicCards = ({ data }) => {
  const { container, iconContainer, blobContainer, blob1, blob2, blob3 } =
    useStyle();
  return (
    <Box className={`${container}`}>
      <Box sx={{ zIndex: "10" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {data?.title}
        </Typography>
        <Box sx={{ padding: "10px 0px" }}>
          <Divider sx={{ width: "50px", height: "2px" }} />
        </Box>
      </Box>

      <Box sx={{ zIndex: "10" }}>
        <Typography color={"inherit"}>{data?.desc}</Typography>
      </Box>
      <Box className={blobContainer}>
        <Box className={blob1}></Box>
        <Box className={blob2}></Box>
        <Box className={blob3}></Box>
      </Box>
      <Box className={iconContainer}>{data?.icon}</Box>
    </Box>
  );
};

export default CharacteristicCards;
