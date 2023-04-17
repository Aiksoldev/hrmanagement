import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import StarIcon from "@mui/icons-material/Star";
import BadgeIcon from "@mui/icons-material/Badge";
import DeckIcon from "@mui/icons-material/Deck";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ProductFeaturesCard from "@/Components/Cards/ProductFeaturesCard";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      overflow: "hidden",
      border: "1px solid red",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
      border: "1px solid red",
    },

    headingContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "20px",
    },
    contentContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      width: "100%",
      border: "1px solid red",
    },
    card:{
        width:'100%',
        maxWidth:'300px',
    }
  };
});

const ProductFeatures = () => {
  const { container, subContainer, headingContainer, contentContainer, card } =
    useStyle();
  const [cardData] = useState([
    {
      icon: <MobileFriendlyIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Self Service Mobile App",
    },
    {
      icon: <ContactMailIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Personal Info Management",
    },
    {
      icon: <AccessTimeIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Leave / Time Management",
    },
    {
      icon: <HourglassTopIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Time, Attendance & Leave",
    },
    {
      icon: <MonetizationOnIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Loan & lease Mangement",
    },
    {
      icon: <Diversity2Icon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Performance & Training",
    },
    {
      icon: <StarIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Benefits and Allowance",
    },
    {
      icon: <BadgeIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Employment Compliance",
    },
    {
      icon: <DeckIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Insurance Benefits",
    },
    {
      icon: <FindInPageIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Document Manager",
    },
    {
      icon: <CardTravelIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "Travel & Expense",
    },
    {
      icon: <AdminPanelSettingsIcon sx={{fontSize:'25px',color:'inherit'}}/>,
      title: "User Role & Ride",
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              You thought HR is boring? - Now fall in love with it!
            </Typography>
          </Box>
          <Box className={"customdivider"}></Box>
        </Box>
        <Box className={contentContainer}>
          {cardData?.map((data, i) => {
            return (
              <Fade direction="up" duration={500 * i} className={card} key={i} triggerOnce>
                <ProductFeaturesCard data={data} />
              </Fade>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFeatures;
