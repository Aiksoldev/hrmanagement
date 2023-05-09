import { store } from "@/Store";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import SliderCard from "../Cards/SliderCard";
import Link from "next/link";
import FeatureProductSlider from "./FeatureProductSlider/FeatureProductSlider";
import YourDoctor from "./YourDoctorSlider/YourDoctorSlider";
import TCAMSlider from "./TCAMSlider/TCAMSlider";
import LabTestSlider from "./FeatureLabTestSlider/FeatureLabTestSlider";
import TopProductSlider from "./TopProductSlider/TopProductSlider";
import BlogSlider from "./BlogSlider/BlogSlider";
import Description from "./Description/Description";
import axios from "axios";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "20px",

      padding: "20px",
    },
    DealSliderContainer: {
      width: "100%",
      maxWidth: "1280px",
      padding: "40px 20px",

      display: "flex",

      justifyContent: "center",
      gap: "20px",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    DealOfDaySlider: {
      width: "100%",
      borderRadius: "20px",
      border: `2px solid ${theme.palette.text.secondary}`,
      position: "relative",
      padding: " 20px",
      paddingTop: "50px",
    },
    offerContainer: {
      width: "100%",
      borderRadius: "20px",
      border: `2px solid ${theme.palette.text.secondary}`,
      position: "relative",
      padding: "20px",
      paddingTop: "50px",
    },
    labelContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      width: "90%",
      background: theme.palette.white.main,
      position: "absolute",
      top: "0px",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  };
});

const breakPointsdeal = [
  { width: 1, itemsToShow: 1 },
  { width: 375, itemsToShow: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1024, itemsToShow: 2 },
  { width: 1199, itemsToShow: 2 },
  { width: 1200, itemsToShow: 2 },
];

const breakPointsHealth = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1024, itemsToShow: 4 },
  { width: 1199, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const breakPointstcam = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1024, itemsToShow: 4 },
  { width: 1199, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const HealthProducts = (props) => {
  console.log(props);
  const {
    container,
    DealSliderContainer,
    offerContainer,
    DealOfDaySlider,
    labelContainer,
  } = useStyle();

  const carouselRef = useRef(null);
  const totalPages = 15;
  let resetTimeout;
  let id = localStorage.getItem("id");
  let logdata = window.localStorage.getItem("log");
  let latdata = window.localStorage.getItem("lat");
  let ipData = window.localStorage.getItem("IP");
  let role_id = localStorage.getItem("role_id");
  let history = useRouter();
  const [state, dispatch] = useContext(store);
  const [allData, setAllData] = useState([]);
  const [dealData, setAllDealData] = useState([]);

  const getBaseUrl = () => {
    return process.env.REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    setAllData(props.AllData);
    setAllDealData(props.DealOfDay);
  }, [props.AllData, props.DealOfDay]);

  console.log("dealData DealOfDay", dealData);

  const handleAddCart = (cardId, name, price, productid) => {
    if (latdata === "undefined" && logdata === "undefined") {
      alert(
        "You denied to location permission,\nAllow the permission from browser's settings or add your product to cart."
      );
    } else {
      let cartValue = id;
      if (role_id === null) {
        cartValue = ipData;
      }

      var axios = require("axios");
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
      axios(config)
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
  const HomeApi = (log, lat, ID) => {
    var qs = require("qs");
    var data = qs.stringify({
      user_session_id: ID,
      longitude: log,
      latitude: lat,
    });
    window.localStorage.setItem("log", log);
    window.localStorage.setItem("lat", lat);
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/homepageproductlist`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("checking aaa", response.data);
        console.log("checking aaakkkk", response.data.DealOfDay);
        if (response.data.status === "1") {
          setAllDealData(response.data.DealOfDay);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const Completionist = () => <span>You are good to go!</span>;
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      HomeApi(props.log, props.lat, props.Id);
      return <Completionist />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  function handelTcam(Packages_id, Products_id, Data) {
    history.push({
      pathname: `/partnerprofiles`,
      state: {
        roleis: { Data },
        Packages_id: Packages_id,
        Products_id: Products_id,
      },
      target: "_blank",
    });
  }

  return (
    <>
      <Box className={container}>
        <Box className={DealSliderContainer}>
          <Box className={DealOfDaySlider}>
            <Box className={labelContainer}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Deal Of The Day
              </Typography>
              <Link href="/LandingPage/HomeLanding?title=dealproduct&page=1">
                <Typography
                  sx={{ fontWeight: "600" }}
                  color={"rgb(140, 190, 77)"}
                >
                  View All
                </Typography>
              </Link>
            </Box>
            <Carousel
              enableAutoPlay={true}
              breakPoints={breakPointsdeal}
              pagination={false}
            >
              {dealData.length > 0 &&
                dealData.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      width: "100%",
                      color: "#fff",
                      padding: "0 10px",
                    }}
                  >
                    <SliderCard
                      item={item}
                      renderer={renderer}
                      link={`/Products/Details/${item?.slug}`}
                    />
                  </Box>
                ))}
            </Carousel>
          </Box>
          <Box className={offerContainer}>
            <Box className={labelContainer}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Offers
              </Typography>
              <Link href="/OfferProducts?title=Offer&id=64268ed926b44a8c63b4b5ef">
                <Typography
                  sx={{ fontWeight: "600" }}
                  color={"rgb(140, 190, 77)"}
                >
                  View All
                </Typography>
              </Link>
            </Box>
            <Carousel
              enableAutoPlay={true}
              breakPoints={breakPointsdeal}
              pagination={false}
            >
              {props.Offer.length > 0 &&
                props.Offer.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      width: "100%",
                      color: "#fff",
                      padding: "0 10px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      history.push(
                        "/OfferProducts?title=Offer&id=64268ed926b44a8c63b4b5ef"
                      )
                    }
                  >
                    <SliderCard
                      item={item}
                      renderer={renderer}
                      link={"/offerproducts"}
                    />
                  </Box>
                ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
      <FeatureProductSlider allData={allData} />
      <YourDoctor YourDoctors={props?.YourDoctors} />
      <TCAMSlider listcam={props?.listcam} />
      <LabTestSlider LabTest={props?.LabTest} />
      <TopProductSlider allData={allData} />
      <BlogSlider BlogData={props?.BlogData} />
      <Description />
    </>
  );
};

export default HealthProducts;
