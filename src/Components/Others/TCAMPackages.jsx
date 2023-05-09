"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import packagebanner from "../../Assets/PageHeaders/packagebanner.png";
import FeatureCard from "../Cards/FeatureCard";
const TCAMLayout = dynamic(() => import("@/Layouts/TCAMLayout"), { ssr: true });
const TCAMBreadcrumb = dynamic(() => import("./TCAMBreadcrumb"), {
  ssr: false,
});
const useStyle = makeStyles((theme) => {
  return {
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      width: "100%",
      //   maxWidth: "1280px",
      padding: "20px",
    },
    cardsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
      width: "100%",
    },
  };
});

const TCAMPackages = ({ tcamImage, tcamproducts, productphotosurl }) => {
  const { contentContainer, cardsContainer } = useStyle();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  let history = useRouter();
  const [TCAMProducts, setTCAMProducts] = useState([]);

  const searchlistname = (name) => {
    if (name === "") {
      setTCAMProducts(tcamproducts);
    } else {
      var qs = require("qs");
      var data = qs.stringify({
        id: history?.query.id,
        searchname: name,
      });
      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/tcampartnerprofilessearch`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setTCAMProducts(response.data.listtcam);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const resetClick = () => {
    setTCAMProducts(tcamproducts);
  };

  useEffect(() => {
    setTCAMProducts(tcamproducts);
  }, [tcamproducts]);

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
    <TCAMLayout>
      <Box className={contentContainer}>
        <Box>
          <Image
            src={packagebanner}
            alt={"medy"}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box>
          <TCAMBreadcrumb />
        </Box>
        <Box className={cardsContainer}>
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: "500px" }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={tcamproducts?.map((option) => {
                return option?.name;
              })}
              onChange={(event, newValue) => {
                searchlistname(newValue);
              }}
              sx={{
                "& .MuiAutocomplete-hasClearIcon.css-1h51icj-MuiAutocomplete-root .MuiAutocomplete-inputRoot":
                  {
                    paddingRight: "0px ",
                  },
                "& .MuiAutocomplete-hasClearIcon.css-1ruhu24-MuiAutocomplete-root .MuiOutlinedInput-root":
                  {
                    paddingRight: "0px ",
                  },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-adornment-password"
                  type="text"
                  sx={{
                    outline: "none",
                    border: "none",
                    "& .css-ql2wih-MuiInputBase-root-MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "30px",
                    },
                    "& .css-1fy6zy6-MuiInputBase-root-MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "30px",
                    },
                    "& .css-1h51icj-MuiAutocomplete-root .MuiOutlinedInput-root":
                      {
                        borderRadius: "30px",
                      },
                  }}
                  fullWidth
                  onChange={(e) => searchlistname(e.target.value)}
                  placeholder="Search By Company Name"
                />
              )}
            />
          </FormControl>
          <Box>
            <Button
              size="small"
              variant="contained"
              sx={{
                padding: "12px 30px",
                borderRadius: "5px",
                flex: "1",
                textTransform: "capitalize",
              }}
              onClick={resetClick}
            >
              Reset
            </Button>
          </Box>
        </Box>

        <Box className={cardsContainer}>
          {TCAMProducts?.map((data) => {
            return (
              <Box
                key={data?.id}
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: "250px",
                  color: "#fff",
                  padding: "0 10px",
                }}
              >
                <FeatureCard
                  item={data}
                  link={`/products/${data?.slug}`}
                  handleAddCart={handleAddCart}
                  productphotosurl={productphotosurl}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </TCAMLayout>
  );
};

export default TCAMPackages;
