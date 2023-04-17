import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import logoscroll from "../../Assets/logoscroll.png";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "5px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        padding: "5px 20px",
      },
    },
    subContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "1280px",
      padding: "10px 0px",
      gap: "20px",
    },
    linkContainer: {
      width: "100%",
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "end",

      gap: "40px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    button: {
      background: theme.palette.white.main,
      padding: "10px 50px",
      borderRadius: "50px",
      transition: "0.5s",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      "&:hover": {
        background: theme.palette.background.main,
        color: theme.palette.white.main,
      },
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    active: { color: theme.palette.primary.main, fontWeight: "bold" },
    linkStyles: {
      color: theme.palette.text.main,
      fontWeight: "bold",
    },
    hamburgerIcon: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
  };
});

const Navbar = ({ enable }) => {
  const {
    container,
    subContainer,
    linkContainer,
    button,
    active,
    linkStyles,
    hamburgerIcon,
  } = useStyle();
  const router = useRouter();
  const [state, setstate] = useState([
    {
      title: "Home",
      selected: true,
      link: "/",
    },
    {
      title: "Features",
      selected: false,
      link: "/Features",
    },
    {
      title: "Products",
      selected: false,
      link: "/Products",
    },

    {
      title: "Services",
      selected: false,
      link: "/Services",
    },
    {
      title: "About Us",
      selected: false,
      link: "/Aboutus",
    },
    {
      title: "Contact",
      selected: false,
      link: "/Contact",
    },
  ]);
  console.log(enable);

  const handleNavigate = (link) => {
    console.log(link);
    const value = state?.map((li) => {
      if (li.link === link) {
        li.active = true;
      } else {
        li.active = false;
      }
      return li;
    });

    setstate(value);
    router.push(link);
  };

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box>
          <Image src={!enable ? logo : logoscroll} alt="logo" />
        </Box>
        <Box className={linkContainer}>
          {state.map((link, i) => {
            return (
              <Typography
                className={link.selected ? active : linkStyles}
                key={i}
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.grey[50],
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.grey[300] },
                }}
                onClick={() => {
                  handleNavigate(link?.link);
                }}
              >
                {link.title}
              </Typography>
            );
          })}
        </Box>
        {!enable ? (
          <Box>
            <Button className={button}>Request A Demo</Button>
          </Box>
        ) : null}

        <Box className={hamburgerIcon}>
          <IconButton>
            <MenuIcon
              color="inherit"
              sx={{
                fontSize: "35px",
                color: (theme) => theme.palette.white.main,
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
