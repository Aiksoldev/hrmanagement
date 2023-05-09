import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "../Cards/ProductCard";
import { toast } from "react-toastify";
import ImageSlider from "../ImageSlider/ImageSlider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
      background: theme.palette.grey[100],
    },
    breadCrumContainer: {
      width: "100%",
    },
    contentContainer: {
      width: "100%",
      borderRadius: "10px",
      padding: "20px",
      background: theme.palette.white.main,
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      alignItems: "start",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    imageContainer: {
      width: "100%",
      position: "relative",
    },
    DetailsContainer: {
      width: "100%",

      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      gap: "20px",
    },
    AddToCardButtonContainer: {
      width: "100%",

      display: "flex",
      justifyContent: "end",
    },
    productQuantityContainer: {
      width: "100%",
    },
    button: {
      padding: "5px 30px !important",
      background: `${theme.palette.text.secondary} !important`,
      borderRadius: "20px !important",
    },
    quantityBox: {
      display: "flex",
      justifyContent: "start",
      padding: "10px 0px",
    },
    iconButton: {
      borderRadius: "2px !important",
      border: `1px solid ${theme.palette.grey[300]} !important`,
    },
    reviewContainer: {
      width: "100%",
      borderRadius: "10px",
      background: theme.palette.white.main,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",

      color: theme.palette.grey[400],
    },
    similarProductContainer: {
      width: "100%",
      borderRadius: "10px",
      background: theme.palette.white.main,
      padding: "10px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",

      flexWrap: "wrap",
    },
    favouriteIconContainer: {
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: "100",
    },
    favourite: {
      background: `${theme.palette.text.secondary} !important`,
      borderRadius: "5px !important",
      color: theme.palette.white.main,
    },
  };
});
const userId = window.localStorage.getItem("id");
const loglocal = window.localStorage.getItem("log");
const latlocal = window.localStorage.getItem("lat");
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();
const token = window.localStorage.getItem("token");
let role_id = localStorage.getItem("role_id");
const ipData = window.localStorage.getItem("IP");

const ProductsDetails = ({ product }) => {
  const {
    container,
    breadCrumContainer,
    contentContainer,
    imageContainer,
    DetailsContainer,
    AddToCardButtonContainer,
    productQuantityContainer,
    button,
    iconButton,
    quantityBox,
    reviewContainer,
    similarProductContainer,
    favouriteIconContainer,
    favourite,
  } = useStyle();

  const [products, setproducts] = useState("");
  const [productsdata, setProductsdata] = useState([]);
  const [Pharmacydata, setPharmacydata] = useState([]);
  const [isActive, setisActive] = useState(true);
  const [name, setName] = useState([]);
  const [similarproducts, setSimilarproducts] = useState([]);
  const [productPhotosurl, setProductPhotosurl] = useState([]);
  const [review, setReview] = useState([]);
  const [offerDetailsdata, setOfferDetailsdata] = useState([]);
  const [rattingCount, setRattingCount] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [quantity, setquantity] = useState(0);
  const [center, setCenter] = useState({});
  const SLIDE_COUNT = 3;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const history = useRouter();
  const getCurrentLoaction = () => {
    if ("geolocation" in navigator) {
      // navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos)
        // (err) => deniedPosition(err),
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };
  const successPosition = async (position) => {
    // setCenter(position.coords.latitude, position.coords.longitude);
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    // listData(latlocal, loglocal);
    Geocode.setApiKey(process.env.REACT_APP_MAP_KEYS);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const formatted_address = response.results[0].formatted_address;
        console.log(response);
      },
      (error) => {
        console.error("", error);
      }
    );
  };

  const listData = (latlocal, loglocal) => {
    setisActive(true);
    let cartValue = userId;
    if (role_id === null) {
      cartValue = "";
    }

    var qs = require("qs");
    var data = qs.stringify({
      category_id: product.brickscode_id || "",
      product_id: product.product_id || "",
      pharmacy_product_id: product.id || "",
      user_session_id: cartValue,
      latitude: Number(latlocal),
      longitude: Number(loglocal),
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/productdetails`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status == 1) {
          console.log(response.data.productsdata[0]);
          setProductsdata(response.data.productsdata[0]);
          setPharmacydata(response.data.PharmacyListData);
          setName(response.data.productsdata[0].pharmacyname);
          setSimilarproducts(response.data.similarproducts);
          setProductPhotosurl(response.data.ProductPhotosurl);
          setReview(response.data.reviews);
          setOfferDetailsdata(response.data.OfferDetailsdata);
          setRattingCount(response.data.rattingcount);
          setImageData(response.data.productsdata[0].images);
          setisActive(false);
        } else {
          setisActive(false);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getCurrentLoaction();
    listData(latlocal, loglocal);
    setproducts(product);
  }, [product]);

  const handleinc = () => {
    if (quantity < 10) {
      setquantity((quantity) => quantity + 1);
    }
  };
  const handledec = () => {
    if (quantity > 0) {
      setquantity((quantity) => quantity - 1);
    }
  };

  const handleAddCart = (cardId, name, price, id) => {
    console.log("hello");
    let cartValue = userId;
    if (role_id == null) {
      cartValue = ipData;
    }

    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      user_session_id: cartValue,
      product_id: cardId,
      product_name: name,
      product_pharmacy_id: id,
      price: price,
      quantity: quantity,
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
        toast.success(response.data.cartdata);
        response.data.cartdata.map((item) => {
          return addCartData.push({
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
          });
        });
        // dispatch({
        //   type: "ADD_CART",
        //   payload: {
        //     cartCount: response.data.cartitemscount,
        //     cartData: addCartData,
        //   },
        // });

        window.localStorage.setItem("cart", response.data.cartitemscount);
        window.localStorage.setItem(
          "localCartData",
          JSON.stringify(addCartData)
        );

        if (response.data.status === "1") {
          history.push("/CartItems");
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleHeartStatus = (
    name,
    productid,
    productpharmacyid,
    price,
    heartstatus
  ) => {
    let data = [...similarproducts];

    let objIndex = data.findIndex((obj) => obj.id === productpharmacyid);
    if (objIndex == "-1") {
      heartstatus = 0;
    } else {
      data[objIndex].heartstatus = heartstatus === 0 ? 1 : 0;
      setSimilarproducts(data);
    }

    if (heartstatus === 0) {
      heartstatus = 1;
    } else {
      heartstatus = 0;
    }
    let cartValue = userId;
    if (role_id == null) {
      cartValue = ipData;
    }

    var axios = require("axios");
    var qs = require("qs");
    var dataVal = qs.stringify({
      user_session_id: cartValue,
      product_id: productid,
      product_pharmacy_id: productpharmacyid,
      product_name: name,
      price: price,
      heartstatus: heartstatus,
    });

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/addtowishlist`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataVal,
    };

    axios(config)
      .then(function (response) {
        if (heartstatus === 0) {
          listData(latlocal, loglocal);
          //   dispatch({
          //     type: "ADD_WISHLISTCOUNT",
          //     payload: { wishListCount: State.wishListCount - 1 },
          //   });
          toast.success(response.data.message);
        } else {
          listData(latlocal, loglocal);
          //   dispatch({
          //     type: "ADD_WISHLISTCOUNT",
          //     payload: { wishListCount: State.wishListCount + 1 },
          //   });
          toast.success(response.data.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <Box className={container}>
      <Box className={breadCrumContainer}>
        <Breadcrumbs separator={"/"}>
          <Typography color={"primary"}>{productsdata?.segmentname}</Typography>
          <Typography color={"primary"}>{productsdata?.familyname}</Typography>
          <Typography color={"primary"}>{productsdata?.classname}</Typography>
          <Typography color={"primary"}>{productsdata?.brickname}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={contentContainer}>
        <Box className={imageContainer}>
          <Box className={favouriteIconContainer}>
            <IconButton
              className={favourite}
              onClick={() => {
                handleHeartStatus(
                  productsdata.name,
                  productsdata.product_id,
                  productsdata.id,
                  productsdata.price,
                  productsdata.heartstatus
                );
              }}
            >
              {productsdata?.heartstatus === 0 ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon />
              )}
            </IconButton>
          </Box>
          <ImageSlider
            imageData={imageData}
            productPhotosurl={productPhotosurl}
          />
        </Box>
        <Box className={DetailsContainer}>
          <Box className={productQuantityContainer}>
            <Typography sx={{ fontWeight: "500" }}>
              {productsdata?.name}
            </Typography>
            <Box
              sx={{
                padding: "10px 0px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Rating name="read-only" value={4} readOnly />
              <Box sx={{ padding: "10px 0px" }}>
                <Typography sx={{ fontSize: "14px" }}>
                  {rattingCount} reviews / Rating {productsdata?.averagerating}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                variant="h6"
                color={"primary"}
                sx={{ fontWeight: "bold" }}
              >
                AED {productsdata.price}
              </Typography>
            </Box>
            <Box>
              <Typography>Quantity:</Typography>
              <Box className={quantityBox}>
                <IconButton className={iconButton} onClick={handledec}>
                  <RemoveIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <TextField
                  value={quantity}
                  sx={{ width: "120px" }}
                  size="small"
                  disabled
                />
                <IconButton className={iconButton} onClick={handleinc}>
                  <AddIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className={AddToCardButtonContainer}>
            <Button
              className={button}
              onClick={() =>
                handleAddCart(
                  productsdata.product_id,
                  productsdata.name,
                  productsdata.price,
                  productsdata.id
                )
              }
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.white.main,
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ADD TO CART
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={reviewContainer}>
        <Typography variant="h6" color={"inherit"} sx={{ fontWeight: "600" }}>
          RATINGS AND REVIEWS
        </Typography>
      </Box>
      <Box
        sx={{
          background: (theme) => theme.palette.white.main,
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: (theme) => theme.palette.grey[400] }}
        >
          SIMILAR PRODUCTS
        </Typography>
        <Box className={similarProductContainer}>
          {similarproducts?.length > 0 &&
            similarproducts?.map((data, i) => {
              return (
                <ProductCard
                  key={i}
                  data={data}
                  handleAddCart={handleAddCart}
                  handleHeartStatus={handleHeartStatus}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsDetails;
