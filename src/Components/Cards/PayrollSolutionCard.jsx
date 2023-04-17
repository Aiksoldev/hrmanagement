import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      flex:1,
      padding: "20px",
      minHeight:'150px',
      color: theme.palette.grey[500],
      position: "relative",
      transition: "0.5s",
      boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      [theme.breakpoints.down('md')]:{
        width:'auto',
    
      }
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      zIndex: 10,
    },
    hoverBox:{
        position:'absolute',
        top:0,
        height:'100%',
        width:'0%',
        left:0,
        background:theme.palette.background.main,
        transition:'0.5s',
        zIndex:'-1',
    }
  };
});

const PayrollSolutionCard = ({ data }) => {
  const { container, subContainer, hoverBox } = useStyle();
  return (
    <Box className={`${container} payrollCardContainer`}>
      <Box className={subContainer}>
        <Box>{data?.icon}</Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {data?.title}
          </Typography>
        </Box>
      </Box>
      <Box className={`${hoverBox} payrollCardBackground`}>

      </Box>
    </Box>
  );
};

export default PayrollSolutionCard;
