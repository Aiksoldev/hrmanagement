import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import ProductFeaturesCard from "@/Components/Cards/ProductFeaturesCard";
import { Fade } from "react-awesome-reveal";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CommuteIcon from "@mui/icons-material/Commute";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BusinessIcon from "@mui/icons-material/Business";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
      overflow: "hidden",
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
    },

    headingContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "20px",
    },
    contentContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "300px",
    },
  };
});

const ProductServices = () => {
  const { container, subContainer, headingContainer, contentContainer, card } =
    useStyle();
  const [cardData] = useState([
    {
      icon: <FactoryIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Manufacturing",
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Healthcare",
    },
    {
      icon: <BusinessIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "IT Company",
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Banking",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Real Estate",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Logistics",
    },
    {
      icon: (
        <VolunteerActivismIcon sx={{ fontSize: "25px", color: "inherit" }} />
      ),
      title: "Insurance",
    },
    {
      icon: <AutoGraphIcon sx={{ fontSize: "25px", color: "inherit" }} />,
      title: "Capital Markets",
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          {cardData?.map((data, i) => {
            return (
              <Fade
                direction="up"
                duration={500 * i}
                className={card}
                key={i}
                triggerOnce
              >
                <ProductFeaturesCard data={data} />
              </Fade>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductServices;
