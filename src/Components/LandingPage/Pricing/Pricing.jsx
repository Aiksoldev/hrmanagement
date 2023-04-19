import PricingCard from "@/Components/Cards/PricingCard";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      width: "100%",
      maxWidth: "1440px",
      alignItems: "center",
      padding: "20px 0px",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      textAlign: "center",
      width: "100%",
      maxWidth: "550px",
    },
    cardContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
  };
});

const Pricing = () => {
  const { container, subContainer, headingContainer, cardContainer } =
    useStyle();
  const [cardData, setcardData] = useState([
    {
      title: "Basic",
      Price: "$47",
      active: false,
      details: [
        {
          title: "Officia quaerat eaque neque",
          active: true,
        },
        {
          title: "Possimus aut consequuntur incidunt",
          active: true,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          active: false,
        },
        {
          title: "Consectetur adipisicing elit",
          active: false,
        },
        {
          title: "Dolorum esse odio quas architecto sint",
          active: false,
        },
      ],
    },
    {
      title: "Premium",
      Price: "$200",
      active: true,
      details: [
        {
          title: "Officia quaerat eaque neque",
          active: true,
        },
        {
          title: "Possimus aut consequuntur incidunt",
          active: true,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          active: true,
        },
        {
          title: "Consectetur adipisicing elit",
          active: true,
        },
        {
          title: "Dolorum esse odio quas architecto sint",
          active: false,
        },
      ],
    },
    {
      title: "Professional",
      Price: "$750",
      active: false,
      details: [
        {
          title: "Officia quaerat eaque neque",
          active: true,
        },
        {
          title: "Possimus aut consequuntur incidunt",
          active: true,
        },
        {
          title: "Lorem ipsum dolor sit amet",
          active: true,
        },
        {
          title: "Consectetur adipisicing elit",
          active: true,
        },
        {
          title: "Dolorum esse odio quas architecto sint",
          active: true,
        },
      ],
    },
  ]);

  const handleActiveCard = (title) => {
    console.log(title);
    let value = cardData?.filter((m) => {
      if (m.title === title) {
        m.active = true;
      } else {
        m.active = false;
      }
      return m;
    });
    setcardData(value);
  };

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Typography variant="h3">Pricing</Typography>
          <Typography>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in
          </Typography>
        </Box>
        <Fade direction="up" duration={1200} triggerOnce>
          <Box className={cardContainer}>
            {cardData?.map((data, i) => {
              return (
                <PricingCard
                  key={i}
                  data={data}
                  handleActiveCard={handleActiveCard}
                />
              );
            })}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default Pricing;
