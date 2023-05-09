import theme from "@/Theme/theme";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const useStyle = makeStyles((theme) => {
  return {
    cartContainer: {
      width: "100%",
      border: `1px solid ${theme.palette.grey[300]}`,
      position: "absolute",
      top: "35px",
      minWidth: "300px",
      display: "none",
      background: "white",
      zIndex: "10",
    },
    contentContainer: {
      position: "relative",
      width: "100%",
      display: "flex",

      flexDirection: "column",
      gap: "10px",
      padding: "10px",
    },
    iconsContainer: {
      fontSize: "55px",
      color: theme.palette.grey[300],
      position: "absolute",
      top: "-32px",
    },
  };
});

const HeaderCart = ({
  state,
  localCartData,
  localCartCount,
  total,
  handleProceed,
}) => {
  const { cartContainer, contentContainer, iconsContainer } = useStyle();
    var size = 2;
  return (
    <Box className={`${cartContainer} ActiveCart`}>
      <Box className={contentContainer}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
            Product Summary
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>
            Item(s)
          </Typography>
        </Box>
        <Box>
          {state.cartData !== "" && state.cartData !== undefined
            ? state.cartData.slice(0, size).map((item) => {
                return (
                  <div className="mc-title" key={item}>
                    <div className="item_neme">{item.product_name}</div>
                    <div className="item_details">
                      AED {Number(item.price).toFixed(2)} x{item.quantity}
                    </div>
                  </div>
                );
              })
            : localCartData != "" &&
              localCartData != undefined &&
              localCartData.slice(0, size).map((item) => {
                return (
                  <div className="mc-title" key={item}>
                    <div className="item_neme">{item.product_name}</div>
                    <div className="item_details">
                      AED {Number(item.price).toFixed(2)} x{item.quantity}
                    </div>
                  </div>
                );
              })}
        </Box>
        <Box>
          <div className="">
            <Typography sx={{ fontSize: "14px" }}>
              Total items in cart
              {state.cartCount < 0
                ? 0
                : state.cartCount == 0 && localCartCount != null
                ? localCartCount
                : state.cartCount}
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="mc_price">
            {state.cartData !== "" && state.cartData !== undefined
              ? state.cartData.map((item) => {
                  total += item.quantity * Number(item.price).toFixed(2);
                })
              : localCartData != "" &&
                localCartData != undefined &&
                localCartData.map((item) => {
                  total += item.quantity * Number(item.price).toFixed(2);
                })}
            <div className="mc_amount">AED {Number(total).toFixed(2)}</div>
          </div>
          {(localCartCount > 0 || state?.cartCount > 0) && (
            <Button
              variant="contained"
              sx={{ padding: "5px 10px" }}
              onClick={() => {
                handleProceed();
              }}
            >
              PROCEED TO CART
            </Button>
          )}
        </Box>
        <ArrowDropUpIcon className={iconsContainer} sx={{fontSize:'55px'}} />
      </Box>
    </Box>
  );
};

export default HeaderCart;
