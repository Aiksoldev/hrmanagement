import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 10px",
      backgroundImage: "url(/topbannerbg.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      height: "100%",
      minHeight: "80vh",
      position: "relative",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      color: theme.palette.white.main,
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    linksContainer: {
      width: "50%",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "end",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "start",
      },
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[200],
      position: "relative",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[50],
    },
    link: {
      transition: "0.5s",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };
});

const TopBanner = ({ title, desc, activePage }) => {
  const {
    container,
    subContainer,
    linksContainer,
    contentContainer,
    innerDivider,
    divider,
    link,
  } = useStyle();
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          <Box>
            <Fade direction="up" duration={1000} triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Fade>
          </Box>
          <Box className={divider}>
            <Box className={innerDivider}></Box>
          </Box>
          <Box>
            <Fade direction="up" duration={1500} triggerOnce>
              <Typography color={"inherit"}>{desc}</Typography>
            </Fade>
          </Box>
        </Box>
        <Box className={linksContainer}>
          <Fade direction="right" duration={1000} triggerOnce>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {activePage}
            </Typography>
          </Fade>
          <KeyboardDoubleArrowRightIcon
            color="inherit"
            sx={{ fontSize: "35px" }}
          />
          <Fade direction="right" duration={1500} triggerOnce>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              className={link}
            >
              <Link href={"/"}>Home</Link>
            </Typography>
          </Fade>
        </Box>
        <Box>
          <Image
            src={"https://www.teamsuite.app/images/icons/anim-icon-17.png"}
            alt={""}
            height={40}
            width={40}
            className="rotationAnimation"
            style={{ position: "absolute", top: "20%", right: "20%" }}
          />
          <Image
            src={"https://www.teamsuite.app/images/icons/anim-icon-19.png"}
            alt={""}
            height={40}
            width={40}
            className="rotationAnimation"
            style={{ position: "absolute", top: "50%", right: "50%" }}
          />
          <Image
            src={"https://www.teamsuite.app/images/icons/anim-icon-18.png"}
            alt={""}
            height={40}
            width={40}
            className="rotationAnimation"
            style={{ position: "absolute", top: "80%", right: "20%" }}
          />
        </Box>
        <Box className={"bouncingdiv"}></Box>
      </Box>
    </Box>
  );
};
export default TopBanner;
