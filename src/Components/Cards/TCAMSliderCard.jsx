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
      maxWidth: "200px",
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
    },
  };
});

const TCAMSliderCard = ({ item, link, handleAddCart }) => {
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
      <Box>
        <Image
          src={item.Profile_Photo}
          alt={"medy deals"}
          width={176}
          height={176}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default TCAMSliderCard;
