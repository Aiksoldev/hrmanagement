import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import * as Scroll from "react-scroll";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      background: theme.palette.background.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      padding: "5px 40px",
      color: theme.palette.white.main,
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      padding: "10px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    divider: {
      width: "1px",
      height: "40px",
      background: theme.palette.grey[500],
      color: theme.palette.grey[500],
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    Typo: {
      color: theme.palette.white,
      cursor: "pointer",
      fontWeight: "bold",
    },
  };
});

const Footer = () => {
  const { container, subContainer, divider, Typo } = useStyle();
  const ScrollLink = Scroll.Link;
  const router = useRouter();
  const handleNavigate = (link) => {
    router.push(link);
  };
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box>
          <ScrollLink
            to="blogs"
            spy={true}
            smooth={true}
            offset={-150}
            duration={500}
          >
            <Typography variant="" className={Typo}>
              Blogs
            </Typography>
          </ScrollLink>
        </Box>
        <Divider orientation="vertical" className={divider} />
        <Box>
          <Typography
            variant=""
            className={Typo}
            onClick={() => handleNavigate("/Careers")}
          >
            Careers
          </Typography>
        </Box>
        <Divider orientation="vertical" className={divider} />
        <Box>
          <Typography
            variant=""
            className={Typo}
            onClick={() => handleNavigate("/Download Brochure")}
          >
            Download Brochure
          </Typography>
        </Box>
        <Divider orientation="vertical" className={divider} />
        <Box>
          <Typography
            variant=""
            className={Typo}
            onClick={() => handleNavigate("/Become_a_Partner")}
          >
            Become a Partner
          </Typography>
        </Box>
        <Divider orientation="vertical" className={divider} />
        <Box>
          <Typography
            variant=""
            className={Typo}
            onClick={() => handleNavigate("/Privacy_Policy")}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
