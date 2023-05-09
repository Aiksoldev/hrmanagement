import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";

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
      minHeight: "270px",
      height: "100%",
      top: "0px",
      width: "100%",
    },
  };
});

const SliderCard = ({ item, renderer, link }) => {
  const { container, button, countdown, overlay } = useStyle();
  const router = useRouter();
  return (
    <Box
      className={container}
      onClick={() => {
        router.push(link);
      }}
    >
      <Box
        sx={{
          margin: "0px auto",
          width: "100%",
          minHeight: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.countdowntype && item.endtimetime ? (
          <Button className={`${button}`}>
            <Typography
              variant=""
              sx={{ color: `white !important`, fontSize: "12px" }}
            >
              {item.countdowntype}
            </Typography>{" "}
            <Typography
              variant=""
              sx={{ color: `white !important`, fontSize: "12px" }}
            >
              <Countdown
                className={countdown}
                date={item.endtimetime + 10000}
                renderer={renderer}
              />
            </Typography>
          </Button>
        ) : null}
      </Box>
      <Box>
        <Image
          src={item.product_image}
          alt={"medy deals"}
          width={176}
          height={176}
          style={{ width: "auto", height: "100%", maxHeight: "176px" }}
        />
      </Box>
      <Box>
        <Box className="feature-detail">
          <Typography
            variant="h4"
            sx={{ fontSize: "12px", color: (theme) => theme.palette.text.main }}
          >
            {item.product_name}
          </Typography>
        </Box>
        <Box
          className="feature-detail"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            color={"error"}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              textDecoration: "line-through",
            }}
          >
            {" "}
            AED {item.price}{" "}
          </Typography>

          <Typography
            variant=""
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "    color: #ffea00 !important",
            }}
          >
            {" "}
            AED {item.deal_price}{" "}
          </Typography>
        </Box>
      </Box>
      <Box className={overlay}></Box>
    </Box>
  );
};

export default SliderCard;
