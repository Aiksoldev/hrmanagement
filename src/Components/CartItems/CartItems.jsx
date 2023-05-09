import Layout from "@/Layouts";
import { store } from "@/Store";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./productCard";
import Loader from "../Loader/Loader";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      background: theme.palette.grey[100],
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    detailsContainer: {
      width: "100%",
      display: "flex",
      height: "100%",
      maxHeight: "80vh",
      overflowY: "scroll",
      flexDirection: "column",
      gap: "20px",
      background: theme.palette.white.main,
      padding: "20px",
      borderRadius: "10px",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb ": {
        backgroundColor: "rgba(200,200,200,1)",
      },
    },
    priceContainer: {
      width: "50%",

      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      borderRadius: "10px",
      background: theme.palette.white.main,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    couponContainer: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      whiteSpace: "nowrap",
      padding: "0px 20px !important",
      width: "50% !important",
      borderRadius: "0px !important",
      color: theme.palette.white.main,
      background: `${theme.palette.text.secondary} !important`,
    },
    priceDetailSection: {
      border: `1px solid ${theme.palette.grey[300]}`,
      padding: "20px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    fieldInrow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
});

const CartItems = () => {
  const {
    container,
    subContainer,
    priceContainer,
    detailsContainer,
    couponContainer,
    button,
    priceDetailSection,
    fieldInrow,
  } = useStyle();

  const token = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("id");
  const cartValue = window.localStorage.getItem("cart");
  const role_id = window.localStorage.getItem("role_id");
  const [cartItem, setCartItem] = useState([]);
  const [cartmsg, setCartmsg] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [amountPaid, setAmountPaid] = useState(0);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [deleveryDate, setDeleveryDate] = useState(
    "Normal delivery (same day)"
  );
  const [scheduledDate, setScheduledDate] = useState();
  let history = useRouter();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const [saved, setSaved] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [productwishdiscount, setProductwishdiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [couponType, setCouponType] = useState("");
  const [shippingdata, setShippingdata] = useState([]);
  const [state, dispatch] = useContext(store);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});
  const baseUrl = getBaseUrl();
  const ipData = window.localStorage.getItem("IP");
  const [count, setCount] = useState(cartValue);
  const [idcount, setIdCount] = useState(0);
  const [couponData, setCouponData] = useState([]);
  const [couponField, setCouponField] = useState(null);
  const [couponCodeValue, setCouponCodeValue] = useState(null);
  const [loading, setloading] = useState(false);
  // validate form here

  function validateForm(fieldsValue) {
    let fields = fieldsValue;
    let errors = {};
    let formIsValid = true;

    if (couponField === null) {
      formIsValid = false;
      errors["coupon_code"] = "*Please enter coupon code.";
    }
    setErrors(errors);
    return formIsValid;
  }
  function validatedelivery(fieldsValue) {
    let fields = fieldsValue;
    let errors = {};
    let formIsValid = true;

    if (deleveryDate == undefined || deleveryDate == "") {
      console.log("y");
      formIsValid = false;
      errors["delivery_date"] = "*Please select a delivery date.";
    }

    if (deleveryDate === "Schedule delivery") {
      console.log("oo");
      if (scheduledDate == null || scheduledDate == "") {
        formIsValid = false;
        errors["scheduled_date"] = "*Please select a delivery date.";
      }
    }

    setErrors(errors);
    return formIsValid;
  }

  const handleCoupon = (e, fieldsValue) => {
    setSaved(0);
    shippingdata.reduce((a, c) => {
      if (c.maxamount_range >= amountPaid && c.minamount_range <= amountPaid) {
        setShippingFee(c.shipping_amount);
      }
    }, 0);
    setDiscount(0);
    const listInc = [...cartItem];
    let total_amount = listInc.reduce((a, c) => {
      return a + c.price * c.quantity;
    }, 0);
    let total_vat = listInc.reduce((a, c) => {
      return a + ((c.price * c.vat) / 100) * c.quantity;
    }, 0);

    setVat(total_amount - (total_amount / 105) * 100);
    setCartTotal((total_amount / 105) * 100);
    setAmountPaid(total_amount);
    if (validateForm(fieldsValue)) {
      const data = {
        cartitemdata: JSON.stringify(cartItem),
        coupon_code: couponField,
      };
      setCouponCodeValue(couponField);
      setloading(true);
      axios
        .post(`${baseUrl}/healthcare/appliedcouponcode`, data)
        .then(function (response) {
          if (couponField != "") {
            toast.success(response.data.message);
          }
          setloading(false);
          setAmountPaid(response.data.data[0].total);
          setSaved(response.data.data[3].discount);
          setCouponType(response.data.data[2].discountcoupontype);
          setDiscount(response.data.data[1].discountcoupon);
          setProductwishdiscount(response.data.data[6].productwish);
          // setShippingFee(response.data.data[4].shippingfee.toFixed(2))
          setVat(response.data.data[5].gstvalue);
        })
        .catch(function (error) {
          if (error.response) {
            setloading(false);

            setCouponField(null);
            if (error.response.data.status === "0") {
              toast.error(error.response.data.message);
              setloading(false);
            } else {
              setloading(false);

              toast.error("Please fill all required details.");
            }
          }
        });
    }
  };
  const handleCheckout = (fieldsValue) => {
    console.log("kkkk");
    console.log("aaa");
    setloading(true)
    if (validatedelivery(fieldsValue)) {
      window.localStorage.setItem("CARTlogin", 1);
      let data = {
        cartitemdata: JSON.stringify(cartItem),
        coupon_code: couponCodeValue,
        saved: saved,
        shippingFee: shippingFee.toFixed(2),
        coupon_discount: discount,
        discountproductwise: productwishdiscount,
        vat: vat,
        amountPaid: Number(vat + cartTotal + shippingFee - saved).toFixed(2),
        cartTotal: cartTotal,
        date_of_delivery: deleveryDate,
        date_of_delivery_date:
          deleveryDate === "Schedule delivery" ? scheduledDate : "",
        couponType: couponType,
      };
          setloading(false);

      if (cartItem !== undefined) {
        console.log(data, "===");
        dispatch({
          type: "FINAL_CART_DATA",
          payload: {
            finalCartData: data,
          },
        });
        window.localStorage.setItem("CARTDATA", JSON.stringify(data));
        if (role_id !== null) {
          history.push("/select-address");
        } else {
          history.push("/Signin");
        }
      }
    }
  };

  useEffect(() => {
    let cartValue = id;
    if (role_id === null) {
      cartValue = ipData;
    }
          setloading(true);

    var qs = require("qs");
    var data = qs.stringify({
      id: cartValue,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/listcartitems`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setisActive(false);
          console.log(response.data.cartitemslist);
          setCartItem(response.data.cartitemslist);

          setCartmsg(response.data.cartmsg);
          response.data.listshipping?.map((data) => {
            if (data?.shipping_amount == 0) {
              setShippingDetails(data);
            }
          });
          setShippingdata(response.data.listshipping);

          let total_vat = response.data.cartitemslist.reduce((a, c) => {
            return a + ((c.price * c.vat) / 100) * c.quantity;
          }, 0);
          let total_amount = response.data.cartitemslist.reduce((a, c) => {
            return a + c.price * c.quantity;
          }, 0);
          let testing = response.data.listshipping.reduce((a, c) => {
            if (
              c.maxamount_range >= total_amount &&
              c.minamount_range <= total_amount
            ) {
              setShippingFee(c.shipping_amount);
            }
          }, 0);

          setCartTotal((total_amount / 105) * 100);
          setAmountPaid(total_amount);
          setVat(total_amount - (total_amount / 105) * 100);
          setloading(false);

        } else {
          toast.error(response.data.message);
          setisActive(false);
          setloading(false);

        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setisActive(false);
          setloading(false);

      });
  }, [idcount]);

  let localCartCount = localStorage.getItem("cart");
  let existItem = localStorage.getItem("localCartData");

  const handleDelete = (id, val) => {
    // //state.cartCount === 0 && localCartCount !=== null ? '' : state.cartCount
          setloading(true);

    if (state.cartCount === 0 && localCartCount !== null) {
                setloading(false);

      dispatch({
        type: "ADD_CART",
        payload: { cartCount: localCartCount, cartData: "" },
      });
    }

    if (state.cartCount > 0 || existItem.length > 0) {
      localStorage.removeItem("CARTDATA");
      const list = [...cartItem];
      const index = list.indexOf(val);
      list.splice(index, 1);
      setCartItem(list);
      // setCount(count - 1);
      if (state.cartCount > 0) {
        window.localStorage.setItem("cart", state.cartCount - 1);
      } else {
        window.localStorage.setItem("cart", 0);
      }
          setloading(false);

      window.localStorage.setItem("localCartData", JSON.stringify(list));
      dispatch({
        type: "ADD_CART",
        payload: { cartCount: state.cartCount - 1, cartData: list },
      });

      var qs = require("qs");
      var data = qs.stringify({
        id: id,
      });

      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/deletecartitem`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setIdCount(id);
          setCouponField("");
          handleCoupon();
          toast.success(response.data.message);
                    setloading(false);

        })
        .catch(function (error) {
          console.log(error);
                    setloading(false);

        });
    }
  };

  const handleQuantity = (quantityType, item) => {
    setCouponField(null);
    if (quantityType === "increment") {
      const listInc = [...cartItem];
      let objIndex = listInc.findIndex((obj) => obj.id === item.id);

      listInc[objIndex].quantity += 1;
      setCartItem(listInc);
      let total_amount = listInc.reduce((a, c) => {
        return a + c.price * c.quantity;
      }, 0);
      let total_vat = listInc.reduce((a, c) => {
        return a + ((c.price * c.vat) / 100) * c.quantity;
      }, 0);
      setCartTotal((total_amount / 105) * 100);
      setAmountPaid(total_amount);
      setSaved(0);
      shippingdata.reduce((a, c) => {
        if (
          c.maxamount_range >= total_amount &&
          c.minamount_range <= total_amount
        ) {
          setShippingFee(c.shipping_amount);
        }
      }, 0);
      setDiscount(0);
      setVat(total_amount - (total_amount / 105) * 100);
    } else {
      setCouponField(null);
      const list = [...cartItem];
      let objIndex = list.findIndex((obj) => obj.id === item.id);
      if (list[objIndex].quantity !== 1) {
        list[objIndex].quantity -= 1;
        setCartItem(list);
        let total_amount = list.reduce((a, c) => {
          return a + c.price * c.quantity;
        }, 0);
        let total_vat = list.reduce((a, c) => {
          return a + ((c.price * c.vat) / 100) * c.quantity;
        }, 0);
        setCartTotal((total_amount / 105) * 100);
        setAmountPaid(total_amount);
        setSaved(0);
        shippingdata.reduce((a, c) => {
          if (
            c.maxamount_range >= total_amount &&
            c.minamount_range <= total_amount
          ) {
            setShippingFee(c.shipping_amount);
          }
        }, 0);
        setDiscount(0);
        setVat(total_amount - (total_amount / 105) * 100);
      }
    }
  };

  return (
    <Layout>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={detailsContainer}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Products
              </Typography>
            </Box>
            {cartItem.length === 0 && cartItem !== undefined ? (
              <div className="empty-cart">
                <h3>{cartmsg}</h3>
              </div>
            ) : (
              cartItem?.map((item, i) => {
                return (
                  <ProductCard
                    item={item}
                    key={i}
                    handleQuantity={handleQuantity}
                    handleDelete={handleDelete}
                  />
                );
              })
            )}
          </Box>
          {cartItem?.length > 0 ? (
            <Box className={priceContainer}>
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                Apply Coupon Code
              </Typography>
              <Box className={couponContainer}>
                <TextField
                  name="coupon_code"
                  fullWidth
                  size="small"
                  placeholder="Coupon Code"
                  value={couponField}
                  onChange={(e) => {
                    setCouponField(e.target.value);
                  }}
                  InputProps={{ style: { borderRadius: "0px" } }}
                />
                <Button
                  className={button}
                  onClick={(e) => {
                    handleCoupon(e, fields);
                  }}
                >
                  <Typography
                    variant={""}
                    sx={{ color: (theme) => theme.palette.white.main }}
                  >
                    Apply Coupon
                  </Typography>
                </Button>
              </Box>
              <Box className={priceDetailSection}>
                <Box className={fieldInrow}>
                  <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                    Total
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    AED {cartTotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box className={fieldInrow}>
                  <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                    COUPON DISCOUNT
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    AED {saved.toFixed(2)}
                  </Typography>
                </Box>
                <Box className={fieldInrow}>
                  <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                    SHIPPING FEE
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    AED {shippingFee.toFixed(2)}
                  </Typography>
                </Box>
                <Box className={fieldInrow}>
                  <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                    SAVED
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    AED {discount.toFixed(2)}
                  </Typography>
                </Box>
                <Box className={fieldInrow}>
                  <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                    VALUE-ADDED TAX(VAT)
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    AED {vat.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                className={fieldInrow}
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  padding: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    borderRadius: "10px !important",
                  }}
                >
                  AMOUNT TO BE PAID
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  AED {Number(vat + cartTotal - saved + shippingFee).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography>Date Of Delivery</Typography>
                <Box>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={deleveryDate}
                    onChange={(e) => {
                      setDeleveryDate(e.target.value);
                    }}
                  >
                    <MenuItem value="Schedule delivery">
                      Schedule delivery
                    </MenuItem>
                    <MenuItem
                      value="Express delivery (within 45 minutes)"
                      selected={
                        "Express delivery (within 45 minutes)" == deleveryDate
                          ? deleveryDate
                          : ""
                      }
                    >
                      Express delivery (within 45 minutes)
                    </MenuItem>
                    <MenuItem
                      value="Normal delivery (same day)"
                      selected={
                        deleveryDate === "Normal delivery (same day)"
                          ? deleveryDate
                          : ""
                      }
                    >
                      Normal delivery (same day)
                    </MenuItem>
                  </TextField>
                  {deleveryDate === "Schedule delivery" ? (
                    <TextField
                      size="small"
                      type="date"
                      fullWidth
                      sx={{ margin: "10px 0px" }}
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  ) : null}
                  <Box>
                    <Typography color={"error"}>
                      {errors.scheduled_date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Button
                  className={button}
                  onClick={() => history.push("/OfferProducts")}
                  fullWidth
                  sx={{
                    width: "100% !important",
                    padding: "10px 20px !important",
                  }}
                >
                  <Typography
                    sx={{ color: (theme) => theme.palette.white.main }}
                  >
                    Continue Shopping
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  className={button}
                  onClick={handleCheckout}
                  fullWidth
                  sx={{
                    width: "100% !important",
                    padding: "10px 20px !important",
                  }}
                >
                  <Typography
                    sx={{ color: (theme) => theme.palette.white.main }}
                  >
                    Proceed to Checkout
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography>By signing up, you agree to our</Typography>
                <Typography color={"primary"}>Terms and Conditions</Typography>
                <Typography color={"primary"}>Return Policy</Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
        {loading ? <Loader /> : null}
      </Box>
    </Layout>
  );
};

export default CartItems;
