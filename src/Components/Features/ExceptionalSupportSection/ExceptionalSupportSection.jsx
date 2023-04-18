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
      desc: "Our HRM software offers a professional implementation service to quickly and seamlessly deploy our flexible, multi-language, multi-organization web-based and user-friendly cross-platform intelligent solution. Our expert team provides assistance for your concerns.",
    },
    {
      title: "Complete Customer Care",
      desc: "We prioritize customer care and ensure that our clients receive the best support services to maximize the potential of our solution. Our support team is highly trained, certified, and committed to making our customers happy.",
    },
    {
      title: "Guidance for HR and Payroll",
      desc: "Our professional services team can assist organizations in developing and implementing. We offer services in designing corporate training strategies, developing training content, and implementing development and learning programs to improve the skills and knowledge of your employees. ",
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
