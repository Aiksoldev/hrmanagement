import { Box, Typography } from "@mui/material";
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
        cursor:'pointer'
      },
    },
    backgroundBlob: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "0%",
      width: "0%",
      zIndex: "-1",
      transition: "0.5s",
      opacity: "0.5",
      background:
        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    },
  };
});

const HRMFeaturesCard = ({ data }) => {
  const { container, backgroundBlob } = useStyle();
  return (
    <Box className={`${container} hrmcard`}>
      <Box>{data?.icon}</Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {data?.title}
        </Typography>
      </Box>
      <Box>
        <Typography color={"inherit"}>{data?.desc}</Typography>
      </Box>
      <Box className={`${backgroundBlob} backgroundBlob`}></Box>
    </Box>
  );
};

export default HRMFeaturesCard;
