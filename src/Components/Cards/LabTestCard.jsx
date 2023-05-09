import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      borderRadius: "50px",
      position: "relative",
      overflow: "hidden",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
      background: "white !important",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    button: {
      padding: "10px 20px",
      background: theme.palette.BackgroundGradient.main,
      color: theme.palette.white.main,
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    countdown: {
      color: theme.palette.white.main,
    },
    overlay: {
      position: "absolute",
      background: "url(./cardbg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundSize: "100%",

      height: "100%",
      top: "0px",
      width: "100%",
    },
    addtoCartContainer: {
      position: "absolute",
      bottom: "0px",
      zIndex: "100",

      color: theme.palette.grey[800],
      background: "#ffea00",
      padding: "2px 20px",
      borderRadius: "20px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center",
    },
  };
});

const LabTestCard = ({ item, link, handleAddCart }) => {
  const { container, button, countdown, overlay, addtoCartContainer } =
    useStyle();
  const router = useRouter();
  return (
    <Box
      className={container}
      // onClick={() => {
      //   router.push(link);
      // }}
    >
      <Box sx={{ zIndex: "100" }}>
        <Image
          src={item.Profile_Photo}
          alt={"medy deals"}
          width={176}
          height={176}
          style={{ width: "100%", height: "176px", borderRadius: "20px" }}
        />
      </Box>
      <Box>
        <Box className="feature-detail">
          <Typography
            variant="h4"
            sx={{ fontSize: "12px", color: (theme) => theme.palette.white.main }}
          >
            {item.name}
          </Typography>
          <Typography variant="" sx={{padding:'5px 0px'}}>{item?.lab_name}</Typography>
          <Typography sx={{ color: "#ffea00 !important" }}>
            {" "}
            AED {Number(item.labtest_amount).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box></Box>
      <Box className={overlay} sx={{ zIndex: "0" }}></Box>
    </Box>
  );
};

export default LabTestCard;
