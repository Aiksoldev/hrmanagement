import SoftwareCard from "@/Components/Cards/SoftwareCard";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 10px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "40px 0px",
      alignItems: "center",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      textAlign: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: "750px",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      gap: "20px",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
  };
});

const ExceptionalSupportSection = () => {
  const { container, subContainer, headingContainer, cardContainer } =
    useStyle();
  const [cardData] = useState([
    {
      title: "Professional Implementation",
      desc: "Powerful Team Suite is flexible, multi-language, multi-organization web based and user friendly cross platform intelligent solution. Our smart team implement and provide assistance to quickly deploy the solution and you can always have a dedicated account manager.",
    },
    {
      title: "Complete Customer Care",
      desc: "At Team Suite we are committed to ensuring our customers receive market leading support services to make the most out of their solution. Our support team are highly trained, certified and passionate about making our customers happy.",
    },
    {
      title: "Guidance for HR and Payroll",
      desc: "Our Professional Services team can help organisations to develop and implement Performance Management programs that positively transform employee performance. We can assist clients in designing corporate training strategies, developing training content and implementing development and learning programs.",
    },
  ]);
  return (
    <Box>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography variant="h3">Exceptional Support</Typography>
            </Fade>
            <Box className={"customdivider"}></Box>
            <Box>
              <Typography>Let&apos;s keep it simple</Typography>
            </Box>
          </Box>
          <Box className={cardContainer}>
            {cardData?.map((data, i) => {
              return (
                <Fade
                  key={i}
                  direction="up"
                  duration={500 * i}
                  style={{ width: "100%" }}
                  triggerOnce
                >
                  <SoftwareCard data={data} />
                </Fade>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExceptionalSupportSection;
