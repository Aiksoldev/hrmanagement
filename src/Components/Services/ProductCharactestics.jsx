import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CharacteristicCard from "../Cards/CharacteristicCard";
import DrawIcon from "@mui/icons-material/Draw";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
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
      maxWidth: "350px",
    },
  };
});

const ProductCharactestics = () => {
  const { container, subContainer, headingContainer, contentContainer, card } =
    useStyle();
  const [cardData] = useState([
    {
      title: "Customization",
      desc: "We offer customization services around template design, incorporation of your branding and style and ensuring the end-user experience is as easy and seamless as possible.",
      icon: <DrawIcon color="primary" sx={{ fontSize: "55px" }} />,
    },
    {
      title: "Training & implementation",
      desc: "With every deployment we provide hands-on training on-site that is tailored to your organization needs.",
      icon: <OnDeviceTrainingIcon color="primary" sx={{ fontSize: "55px" }} />,
    },
    {
      title: "Technical Support",
      desc: "We pride ourselves by providing personal support in your time-zone to assist with any questions you have. Our support team is just a phone call away!",
      icon: <HelpCenterIcon color="primary" sx={{ fontSize: "55px" }} />,
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Box>
            <Fade direction="up" triggerOnce duration={1000}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Time Efficient & Cost Effective
              </Typography>
            </Fade>
          </Box>
          <Box className={"customdivider"}></Box>
          <Box>
            <Fade duration={1500} triggerOnce direction="up">
              <Typography>
                Combination of HR software & consultancy makes managing your
                people easy, time efficient and cost effective.
              </Typography>
            </Fade>
          </Box>
        </Box>
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
                <CharacteristicCard data={data} />
              </Fade>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCharactestics;
