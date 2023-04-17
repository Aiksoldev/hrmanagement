import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React, { useState } from "react";
import mobile from "../../../Assets/mobile.png";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PayrollSolutionCard from "@/Components/Cards/PayrollSolutionCard";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      padding: "10px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      padding: "20px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "50px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        padding: "10px",
      },
    },
    ImageContainer: {
      width: "60%",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "center",
      },
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[500],
      position: "relative",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[800],
    },
    cardContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
    },
    cardBox:{
      width:'100%',
      maxWidth:'200px',
      [theme.breakpoints.down('md')]:{
        width:'100%',
        maxWidth:'unset'
      }
    }
  };
});

const PayrollMobileBanner = () => {
  const {
    container,
    subContainer,
    ImageContainer,
    contentContainer,
    innerDivider,
    divider,
    cardContainer,
    cardBox,
  } = useStyle();
  const [cardData] = useState([
    {
      icon: <StorageIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Personal Data Management",
    },
    {
      icon: <PersonIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Resource Management",
    },
    {
      icon: <AccessTimeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Leave / Time Management",
    },
    {
      icon: <StarIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "HR & Benefits Administration",
    },
    {
      icon: <RequestPageIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Payroll",
    },
    {
      icon: <FactCheckIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Final Settlement",
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={ImageContainer}>
          <Slide duration={3000} direction="left" triggerOnce>
            <Image
              src={mobile}
              alt={"mobile"}
              style={{ width:  "100%" , height: "auto" }}
            />
          </Slide>
        </Box>
        <Box className={contentContainer}>
          <Box sx={{ width: "100%", maxWidth: "600px" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              An End to End Complete Payroll Solution
            </Typography>
          </Box>
          <Box className={divider}>
            <Box className={innerDivider}></Box>
          </Box>
          <Box>
            <Typography>
              With detailed processes from ‘Hire to Retire’
            </Typography>
          </Box>
          <Box className={cardContainer}>
            {cardData?.map((data, i) => {
              return (
                <Fade
                  duration={500 * (i + 1)}
                  key={i}
                  direction="up"
                
                  triggerOnce
                  className={cardBox}
                >
                  <PayrollSolutionCard data={data} />
                </Fade>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PayrollMobileBanner;
