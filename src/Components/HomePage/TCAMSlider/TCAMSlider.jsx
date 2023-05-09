import { store } from "@/Store";
import FeatureCard from "@/components/Cards/FeatureCard";
import TCAMSliderCard from "@/components/Cards/TCAMSliderCard";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import Carousel, { consts } from "react-elastic-carousel";
import { toast } from "react-toastify";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.grey[100],
    },
    contentContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      position: "relative",
    },
    bannerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      padding: "12px 40px",
    },
  };
});
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 3 },
  { width: 1024, itemsToShow: 4 },
  { width: 1199, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();
const token = window.localStorage.getItem("token");
let logdata = window.localStorage.getItem("log");
let latdata = window.localStorage.getItem("lat");
let id = localStorage.getItem("id");
let ipData = window.localStorage.getItem("IP");
let role_id = localStorage.getItem("role_id");
const TCAMSlider = ({ listcam }) => {
  const [state, dispatch] = useContext(store);
  console.log(listcam);
  const { container, contentContainer, bannerContainer } = useStyle();
  const history = useRouter()

  const handleAddCart = async (cardId, name, price, productid) => {
    if (latdata === "undefined" && logdata === "undefined") {
      alert(
        "You denied to location permission,\nAllow the permission from browser's settings or add your product to cart."
      );
    } else {
      let cartValue = id;
      if (role_id === null) {
        cartValue = ipData;
      }

      var qs = require("qs");
      var data = qs.stringify({
        user_session_id: cartValue,
        product_id: productid,
        product_name: name,
        product_pharmacy_id: cardId,
        price: price,
        quantity: 1,
      });

      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/addtocart`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      let addCartData = [];
      await axios(config)
        .then(function (response) {
          if (response.data.status === "1") {
            response.data.cartdata.map((item) => {
              addCartData.push({
                product_name: item.product_name,
                price: item.price,
                quantity: item.quantity,
              });
            });
          }
          dispatch({
            type: "ADD_CART",
            payload: {
              cartCount: response.data.cartitemscount,
              cartData: addCartData,
            },
          });
          window.localStorage.setItem("cart", response.data.cartitemscount);
          window.localStorage.setItem(
            "localCartData",
            JSON.stringify(addCartData)
          );
          toast.success(response.data.message);
        })
        .catch(function (error) {
          toast.error(error.message);
        });
    }
  };
function handleClick(name, Packages_id, Products_id, Data, TcamName) {
  // history.push({
  //   pathname: `/landingothers/${name}`,
  //   state: {
  //     Packages_id: Packages_id,
  //     Products_id:Products_id
  //   },
  //   target: "_blank",
  // });
  console.log("TcamName inside others", Data);
  history.push({
    pathname: `/TCAMPartnerProfile`,
    query: {
      id: Data,
      TcamName: TcamName,
      Packages_id: Packages_id,
      Products_id: Products_id,
    },

    target: "_blank",
  });
}
  return (
    <Box className={container}>
      <Box className={contentContainer}>
        <Box className={bannerContainer}>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            TCAM
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "600" }} color={"ori"}></Typography>
            <Box sx={{ width: "80px" }}>
              <Typography></Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: "20px" }}>
          <Carousel
            enableAutoPlay={true}
            breakPoints={[
              { width: 1, itemsToShow: 1 },
              { width: 550, itemsToShow: 3 },
              { width: 768, itemsToShow: 3 },
              { width: 1024, itemsToShow: 4 },
              { width: 1199, itemsToShow: 4 },
              { width: 1200, itemsToShow: 4 },
            ]}
            pagination={false}
          >
            {listcam?.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  color: "#fff",
                  padding: "0 10px",
                }}
                onClick={() => {
                  handleClick(
                    item.navigation,
                    item.Packages_id,
                    item.Products_id,
                    item.roleis,
                    item.name
                  );
                }}
              >
                <TCAMSliderCard
                  item={item}
                  // link={`/products/${item?.slug}`}/
                  handleAddCart={handleAddCart}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default TCAMSlider;
