import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import banner3 from "../../../Assets/PageHeaders/banner3.jpg";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Countdown from "react-countdown";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "20px",
      background: theme.palette.grey[100],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    subContainer: {
      width: "100%",
      maxWidth: "1440px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
    ContentContainer: {
      width: "100%",
      display: "flex",

      justifyContent: "start",
      gap: "20px",
      padding: "40px 20px",
      background: theme.palette.white.main,
      borderRadius: "10px",
      flexWrap: "wrap",
    },
    card: {
      width: "100%",
      maxWidth: "330px",
      //   height: "100%",
      minHeight: "350px",
      
      display: "flex",
      flexDirection: "column",
      position: "relative",
      gap: "10px",
      padding: "20px",
      alignItems: "center",
      textAlign: "center",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    button: {
      padding: "3px 20px",
      position: "relative",
      top: "2px",
      background: theme.palette.BackgroundGradient?.main,
    },
  };
});

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const Completionist = () => <span>You are good to go! </span>;

const baseUrl = getBaseUrl();
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    listOfProducts(1);
    return <Completionist />;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
const HomeLandingSection = ({ page, title, count, homeproduct }) => {
  console.log(homeproduct);
  const { container, subContainer, ContentContainer, card, button } =
    useStyle();
  const cookies = new Cookies();
  const role_id = cookies.get("role_id");
  const token = cookies.get("token");
  const ipData = cookies.get("ipData");
  const id = cookies.get("id");
  const history = useRouter();
  console.log(role_id);
  async function handleChange(event, value) {
    window.scrollTo(0, 0);
    history.push(`/LandingPage/HomeLanding?title=${title}&page=${value}`);
  }

  const handleAddCart = (cardId, product_name, price, product_id) => {
    if (id === null) {
      var UserID = ipData;
    } else {
      var UserID = id;
    }
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      user_session_id: UserID,
      user_id: id,
      product_id: product_id,
      product_name: product_name,
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
        //    dispatch({
        //      type: "ADD_CART",
        //      payload: {
        //        cartCount: response.data.cartitemscount,
        //        cartData: addCartData,
        //      },
        //    });
        window.localStorage.setItem("cart", response.data.cartitemscount);
        window.localStorage.setItem(
          "localCartData",
          JSON.stringify(addCartData)
        );
        toast.success(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box>
          <Image
            src={banner3}
            alt={""}
            style={{ width: "100%", height: "auto" }}
          />
          <Typography>
            Showing{" "}
            <Typography sx={{ fontWeight: "bold" }} component={"span"}>
              {(page - 1) * 20 + 1}
            </Typography>{" "}
            to
            <Typography sx={{ fontWeight: "bold" }} component={"span"}>
              {" "}
              {(page - 1) * 20 + homeproduct?.length}
            </Typography>{" "}
            from
            <Typography sx={{ fontWeight: "bold" }} component={"span"}>
              {" "}
              {count}
            </Typography>{" "}
            items
          </Typography>
        </Box>
        <Box className={ContentContainer}>
          {homeproduct &&
            homeproduct?.map((data, i) => {
              return (
                <Box className={card} key={i}>
                  {data.dealtype == "deal" ? (
                    <Button className={button}>
                      <Typography>{data.countdowntype} : </Typography>
                      <Typography>
                        <Countdown
                          date={data.endtimetime + 10000}
                          renderer={renderer}
                        />
                      </Typography>
                    </Button>
                  ) : (
                    ""
                  )}
                  <Box>
                    <Link
                      href={
                        title === "dealproduct"
                          ? `/Products/Details/${data?.slug}`
                          : "#"
                      }
                    >
                      <Image
                        src={data?.product_image}
                        alt=""
                        height={1000}
                        width={1000}
                        style={{ width: "auto", height: "150px" }}
                      />
                    </Link>
                  </Box>
                  <Box sx={{ minHeight: "60px" }}>
                    <Link
                      href={
                        title === "dealproduct"
                          ? `/Products/Details/${data?.slug}`
                          : "#"
                      }
                    >
                      <Typography sx={{ fontWeight: "400" }}>
                        {data.product_name}
                      </Typography>
                    </Link>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <Box>
                      {title == "dealproduct" ? (
                        <Typography
                          sx={{
                            color: "#ce2828",
                            textDecoration: " line-through",
                            display: "inline",
                          }}
                        >
                          AED {Number(data.price).toFixed(2)}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      {title == "dealproduct" ? (
                        <Typography>
                          AED {Number(data.deal_price).toFixed(2)}
                        </Typography>
                      ) : (
                        <Typography>
                          {" "}
                          AED {Number(data.price).toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    {data.instockvalue == 0 ? (
                      <Button
                        variant="contained"
                        fullWidth
                        style={{ background: "grey" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: (theme) => theme.palette.white.main,
                          }}
                        >
                          Out Of Stock
                        </Typography>
                      </Button>
                    ) : (
                      (role_id == 3 || role_id == null) && (
                        // data?.countdowntype == "Ends in" && (
                        <Button
                          disabled={data?.countdowntype == "Starts in"}
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            handleAddCart(
                              data.id,
                              data.product_name,
                              title == "dealproduct"
                                ? data.deal_price
                                : data.price,
                              data.product_id
                            )
                          }
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: (theme) => theme.palette.white.main,
                            }}
                          >
                            Add To Cart
                          </Typography>
                        </Button>
                      )
                      // )
                    )}
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box>
          {count > 20 && (
            <Stack spacing={22}>
              <Pagination
                count={Math.ceil(count / 20)}
                onChange={handleChange}
                // currentPage={1}
                onPageActive={1}
                shape="rounded"
              />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLandingSection;
