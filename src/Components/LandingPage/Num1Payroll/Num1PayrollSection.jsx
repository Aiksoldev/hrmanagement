import SoftwareCard from "@/Components/Cards/SoftwareCard";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import { Flip } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
      [theme.breakpoints.down('md')]:{
        padding:'10px'
      }
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems:'center',
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      padding: "50px 0px",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[500],
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[800],
    },
    Typo: {
      color: theme.palette.grey[600],
    },
  };
});

const Num1PayrollSection = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    divider,
    innerDivider,
    Typo,
  } = useStyle();
  const [cardData] = useState([
    {
      icon: <TouchAppIcon color={'primary'} sx={{fontSize:'55px'}} />,
      title: "Empower Employees",
      desc: "Comprehensive employee self service portal",
    },
    {
      icon: <InsertPageBreakIcon color={'primary'} sx={{fontSize:'55px'}} />,
      title: "Hassle-free Paperless Solution",
      desc: "Workflow is there for approve / refuse with delay",
    },
    {
      icon: <PhonelinkSetupIcon color={'primary'} sx={{fontSize:'55px'}} />,
      title: "Cost Effective, Customizable",
      desc: "Customization is always expensive but not with Team Suite.",
    },
  ]);
  return (
    <>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Why #1 in Pakistan | Payroll Software
            </Typography>
            <Box>
              <Box className={divider}>
                <Box className={innerDivider}></Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" className={Typo}>
                Decision to Choose Team Suite is easy
              </Typography>
            </Box>
          </Box>
          <Box className={contentContainer}>
            {cardData?.map((data, i) => {
              return (
                <Flip key={i} style={{width:'100%'}} triggerOnce>
                  <SoftwareCard data={data} />
                </Flip>
              );
            })}
          </Box>
          <Box>
            <Button variant="contained" sx={{padding:'10px 40px',borderRadius:'20px'}}>Download Brochure</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Num1PayrollSection;
