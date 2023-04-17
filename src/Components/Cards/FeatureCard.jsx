import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      flex:1,
      width:'250px',
      minHeight: "250px",
      padding: "20px",
      color: theme.palette.grey[500],
      position: "relative",
      borderRadius: "20px",
      transition: "0.5s",
      // boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      [theme.breakpoints.down("md")]: {
        // width: "100%",
        maxWidth: "unset",
      },
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      zIndex: 10,
      justifyContent: "space-between",
      // alignItems: "center",
      textAlign: "left",
    },
  };
});

const FeatureCard = ({ data }) => {
  const { container, subContainer } = useStyle();
  return (
    <Box className={`${container}`}>
      <Box className={subContainer}>
        <Box>
          <Image src={data?.img} alt={""} style={{}} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {data?.title}
          </Typography>
        </Box>
        <Box>
          <Typography>{data?.desc}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureCard;
