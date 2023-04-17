import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React, { useState } from "react";
import support from "../../../Assets/support.png";
import { Fade, Slide } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 10px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "center",
      alignItems: "center",
      background: "url(./freesupportbg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center right",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      textAlign: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      gap: "20px",
      padding: "50px 0px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentBox: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    imageContainer: {
      width: "100%",

      height: "50vh",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      textAlign: "left",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    image: {
      width: "auto",
      height: "auto",
      boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };
});

const FreeAndFastSupport = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    contentBox,
    imageContainer,
    card,
    image,
  } = useStyle();
  const [cardData] = useState([
    {
      img: "https://www.teamsuite.app/images/icons/icon-4.png",
      title: "Support",
      desc: "We pride ourselves by providing personal support in your time-zone to assist with any questions you have. Our support team is just a phone call away!",
    },
    {
      img: "https://www.teamsuite.app/images/icons/icon-5.png",
      title: "Customization",
      desc: "We offer customization services around template design, incorporation of your branding and style and ensuring the end-user experience is as easy and seamless as possible",
    },
    {
      img: "https://www.teamsuite.app/images/icons/icon-6.png",
      title: "Training & Implementation",
      desc: "With every deployment we provide hands-on training on-site that is tailored to your organizational needs",
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Free & Fast Support
            </Typography>
          </Box>
          <Box className={"customdivider"} />
          <Box>
            <Typography>
              New-Age Paperless HCM - Business Hours Support
            </Typography>
          </Box>
        </Box>
        <Box className={contentContainer}>
          <Box className={contentBox}>
            {cardData?.map((data, i) => {
              return (
                <Fade
                  key={i}
                  direction="up"
                  duration={500 * i}
                  triggerOnce
                  style={{ width: "100%" }}
                >
                  <Box className={card}>
                    <Box>
                      <Image
                        src={data?.img}
                        alt={""}
                        height={500}
                        width={500}
                        quality={100}
                        style={{ width: "auto", height: "auto" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {data?.title}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>{data?.desc}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              );
            })}
          </Box>
          <Box className={imageContainer}>
            <Slide direction="right" duration={1500} triggerOnce>
              <Image src={support} alt="" className={image} />
            </Slide>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FreeAndFastSupport;
