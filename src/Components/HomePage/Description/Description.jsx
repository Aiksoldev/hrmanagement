import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
   
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.grey[100],
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      width: "100%",
      maxWidth: "1280px",
   
    },
  };
});

const Description = () => {
  const { container, contentContainer } = useStyle();
  return (
    <Box className={container}>
      <Box className={contentContainer}>
        <Typography>
          At Medy, our purpose is to improve people’s health and well-being
          through solutions like Body Fitness, Ayurveda, Acupuncture,
          Chiropractic Medicine, Homeopathy, Meditation, Physiotherapy and much
          more
        </Typography>
        <Typography>
          Healthcare services and products present distinct challenges when
          compared to other consumer goods and services because it deals with
          health behaviors rather than merely buying behaviors. The healthcare
          centers are about more than just raising awareness and educating
          people; it's also about changing people's perceptions. A changing
          population and their accompanying issues, improvements in research,
          and other external variables all have an impact on the healthcare
          industry.
        </Typography>
        <Typography>
          We, at Medy, are more concerned about the rising health issues and
          wish to become a healthcare partner for every one of you coming to our
          portal. Our collaboration with the top brands of the industry helps us
          to bring the best of offerings to all our web visitors and mobile app
          users. From healthcare products to healthcare services to lab tests to
          doctor consultations, along with special sections on TCAM (
          Traditional , Complimentary & Alternative Medicine ), we have
          established ourselves as a common point of contact through our
          healthcare platform. We'll be there for you every step of your
          healthcare journey, whether it's today or tomorrow, wherever and
          whenever you need us. We provide a comprehensive range of unique
          services and products to assist you. On our healthcare platform,
          discover how our services offer intelligent technologies that add
          value for you. You can feel assured about our services - services that
          help your health be at its best in the long run
        </Typography>
      </Box>
    </Box>
  );
};

export default Description;
