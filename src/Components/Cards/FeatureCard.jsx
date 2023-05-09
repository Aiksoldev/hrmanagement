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

const FeatureCard = ({ item, link, handleAddCart, productphotosurl }) => {
  const { container, button, countdown, overlay, addtoCartContainer } =
    useStyle();
  const router = useRouter();
  console.log(`${productphotosurl}${item.product_image}`);
  return (
    <Box
      className={container}
      onClick={() => {
        router.push(`/Products/Details/${item?.slug}`);
      }}
    >
      <Box>
        <Image
          src={
            productphotosurl
              ? `${productphotosurl}${item.image.split(",")[0]}`
              : item.product_image
          }
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
            gap: "15px",
            paddingBottom: "10px",
            justifyContent: "center",
          }}
        >
          <Typography
            color={item?.deal_price ? "error" : "#ffea00"}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              textDecoration: item?.deal_price ? "line-through" : "none",
            }}
          >
            {" "}
            AED {item.price}{" "}
          </Typography>
          {item?.deal_price ? (
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
          ) : null}
        </Box>
      </Box>
      <Box className={overlay}></Box>
      <Box
        className={addtoCartContainer}
        onClick={(e) => {
          console.log("helo");
          e.stopPropagation();
          handleAddCart(
            item.id,
            item.product_name,
            item.price,
            item.product_id
          );
        }}
      >
        <AddShoppingCartIcon sx={{ fontSize: "16px" }} />
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          Add To Cart
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
