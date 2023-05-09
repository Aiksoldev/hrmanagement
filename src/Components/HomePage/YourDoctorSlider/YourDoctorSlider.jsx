import { store } from "@/Store";
import FeatureCard from "@/components/Cards/FeatureCard";
import YourDoctorCard from "@/components/Cards/YourDoctorCard";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Link from "next/link";
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
      background: "url(./doctor-bg.cc9f76f6.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
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
      color: theme.palette.white.main,
      padding: "12px 40px",
    },
  };
});
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
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

const YourDoctor = ({ YourDoctors }) => {
  const [state, dispatch] = useContext(store);
  console.log(YourDoctors);
  const { container, contentContainer, bannerContainer } = useStyle();

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

  return (
    <Box className={container}>
      <Box className={contentContainer}>
        <Box className={bannerContainer}>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            Your Doctor
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href={"/HomeDoctor?page=1"}>
              <Typography sx={{ fontWeight: "500" }} color={"inherit"}>
                View All
              </Typography>
            </Link>
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
            {YourDoctors?.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: "350px",
                  color: "#fff",
                  padding: "0 10px",
                }}
              >
                <YourDoctorCard
                  item={item}
                  link={`/products/${item?.slug}`}
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

export default YourDoctor;
