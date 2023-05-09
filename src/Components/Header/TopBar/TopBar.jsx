import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { headerIcons } from "@/Resources/HeaderIcons";

const useStyle = makeStyles((theme) => {
  return {
    TopBarContainer: {
      width: "100%",
      padding: "8px 40px",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      background: theme.palette.BackgroundGradient.main,
      [theme.breakpoints.down("md")]: {
        padding: "8px 10px",
        gap: "10px",
      },
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "space-between",
        gap: "10px",
      },
    },
    IconsBox: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      [theme.breakpoints.down("md")]: {
        gap: "10px",
      },
    },
    divider: {
      height: "25px",
      width: "2px",
      background: theme.palette.white.main,
    },
    phoneContainer: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    titleContainer: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    images: {
      width: "25px",
      height: "auto",
      [theme.breakpoints.down("md")]: {
        width: "20px",
      },
    },
  };
});

const TopBar = () => {
  const {
    TopBarContainer,
    iconsContainer,
    IconsBox,
    divider,
    phoneContainer,
    titleContainer,
    images,
  } = useStyle();
  return (
    <Box className={TopBarContainer}>
      <Box className={titleContainer}>
        <Typography color={"inherit"}>Free Shipping</Typography>
      </Box>
      <Box className={iconsContainer}>
        <Box className={IconsBox}>
          {headerIcons?.map((icons, i) => {
            return (
              <Link key={i} href={icons?.link} target="_black">
                <Image
                  src={icons?.icon}
                  alt="medy social links"
                  quality={100}
                  className={images}
                />
              </Link>
            );
          })}
          <Box>
            <Divider className={divider} />
          </Box>
        </Box>

        <Box className={`${phoneContainer} bounce`}>
          <LocalPhoneIcon />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
            color={"inherit"}
          >
            800 6339 (800 - MEDY)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
