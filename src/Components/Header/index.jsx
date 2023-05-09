"use client";

import {
  Autocomplete,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import logo from "../../Assets/logo.png";
import React, { useContext, useEffect, useState } from "react";
import TopBar from "./TopBar/TopBar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import partner from "../../Assets/buttons/partner.png";

import MenuIcon from "@mui/icons-material/Menu";

import healthcare from "../../Assets/header/healthcare.png";
import consultadoctor from "../../Assets/header/consultadoctor.png";
import diagnostics from "../../Assets/header/diagnostics.png";
import healthcorner from "../../Assets/header/healthcorner.png";
import tcam from "../../Assets/header/tcam.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { store } from "@/Store";
import HeaderCart from "../Carts/HeaderCart";
import { toast } from "react-toastify";

const useStyle = makeStyles((theme) => {
  return {
    container: {},
    subContainer: {
      width: "100%",
      padding: "10px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "80px",
      [theme.breakpoints.down("xl")]: {
        gap: "8%",
      },
      [theme.breakpoints.down("lg")]: {
        gap: "5%",
      },
      [theme.breakpoints.down("md")]: {
        padding: "10px",
        gap: "3%",
        alignItems: "start",
      },
    },
    logoContainer: {
      width: "100%",
      // flex: 1,
      display: "flex",
      alignItems: "center",
      position: "relative",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        width: "auto",
        // minWidth: "150px",
      },
    },
    buttonsContainer: {
      width: "100%",
      // flex: 1,

      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      gap: "20px",
      [theme.breakpoints.down("lg")]: {
        gap: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        alignItems: "end",
      },
    },
    logoimg: {
      height: "auto",
      width: "100%",
      maxWidth: "160px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        maxWidth: "140px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "100px",
        minWidth: "120px",
        position: "absolute",
        bottom: "-50px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        maxWidth: "60px",
      },
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      cursor: "pointer",
      [theme.breakpoints.down("xl")]: {
        // flexWrap: "wrap",
        // flexDirection: "column",
        textAlign: "center",
      },
    },
    partnerButton: {
      background: theme.palette.BackgroundGradient.main,
      padding: "10px 20px",
      borderRadius: "50px",
    },
    autocomplete: {
      width: "100%",
      minWidth: "150px",
      "& .MuiAutocomplete-inputRoot": {
        borderRadius: "50px",
      },
    },
    autocompleteContainer: {
      transition: "0.5s",
      width: "60%",
      [theme.breakpoints.down("lg")]: {
        width: "80%",
      },
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    hidden: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    iconsSection: {
      // flex:1,
      // width: "100%",
      flexShrink: "inherit",
      display: "flex",
      gap: "20px",
      justifyContent: "end",
      [theme.breakpoints.down("md")]: {
        gap: "15px",
      },
    },
    navContainer: {
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    navSubContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 40px",

      gap: "20px",
    },
    card: {
      position: "center",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      alignItems: "center",
      // justifyContent: "center",
      gap: "10px",
    },
    dropDown: {
      position: "absolute",
      border: `1px solid ${theme.palette.grey[300]}`,
      width: "100%",
      top: "100%",
      Zindex: "300",
      display: "none",
      background: theme.palette.white.main,
      transition: "0.5s",
      overflow: "hidden",
      height: "0%",
    },
    typo: {
      fontWeight: "500",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
      },
    },
    navigationContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    dropdown: {
      width: "100%",
      display: "none",
      flexDirection: "column",
      padding: "5px 20px",
      background: theme.palette.white.main,
      [theme.breakpoints.down("md")]: {
        display: "flex",
      },
    },
    fieldContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
    },
    autocompleteContainerdrop: {
      transition: "0.5s",
      width: "40%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    dropList: {
      width: "100%",
      transition: "0.5s",
      height: "0px",
      padding: "0px 20px",
      overflow: "hidden",
    },
    activeDrop: {
      height: "400px",
      transition: "0.5s",
      display: "flex",
      alignItems: "center",
      transitionDelay: "250mn",
      justifyContent: "start",
    },
  };
});

const Header = (props) => {
  console.log(props);
  const {
    container,
    subContainer,
    logoContainer,
    buttonsContainer,
    logoimg,
    iconsContainer,
    partnerButton,
    autocomplete,
    autocompleteContainer,
    hidden,
    iconsSection,
    navContainer,
    navSubContainer,
    card,
    dropDown,
    typo,
    navigationContainer,
    dropdown,
    fieldContainer,
    autocompleteContainerdrop,
    dropList,
    activeDrop,
  } = useStyle();
  const Swal = require("sweetalert2");
  const history = useRouter();
  var size = 2;
  const Id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [activedrop, setactivedrop] = useState(false);
  const [title, setTitle] = useState([]);
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(store);

  let role_id = localStorage.getItem("role_id");
  let userNAme = localStorage.getItem("Username");
  let ipData;
  let wishlists = localStorage.getItem("wishlist");
  let localCartCount = localStorage.getItem("cart");
  let localCartData = localStorage.getItem("localCartData");
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchData, setsearchData] = useState([]);
  const [notification, setNotification] = useState({ title: "", body: "" });
  let cart = "";
  localCartData = JSON.parse(localCartData);
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();

  useEffect(() => {
    //  (async () => {
    //    const hasFirebaseMessagingSupport = await isSupported();
    //    // console.log("Home Supportbrowser", hasFirebaseMessagingSupport);
    //    if (hasFirebaseMessagingSupport) {
    //      var firebaseConfig = {
    //        apiKey: "AIzaSyCoKN36ru0nx9I0tqlvcMMxjPhc9Az-lTk",
    //        authDomain: "medyae-b6df5.firebaseapp.com",
    //        projectId: "medyae-b6df5",
    //        storageBucket: "medyae-b6df5.appspot.com",
    //        messagingSenderId: "951867008659",
    //        appId: "1:951867008659:web:af9c24f0985f8f10248f66",
    //        measurementId: "G-VPWFGCFFR3",
    //      };

    //      const firebaseApp = initializeApp(firebaseConfig);
    //      const messaging = getMessaging(firebaseApp);
    //      if (
    //        role_id == "2" ||
    //        role_id == "7" ||
    //        role_id == "8" ||
    //        role_id == "9" ||
    //        role_id == "10" ||
    //        role_id == "11" ||
    //        role_id == "13" ||
    //        role_id == "14" ||
    //        role_id == "15" ||
    //        role_id == "4" ||
    //        role_id == "5" ||
    //        role_id == "1"
    //      ) {
    //        onMessage(messaging, (payload) => {
    //          setShow(true);
    //          setNotification({
    //            title: payload.notification.title,
    //            body: payload.notification.body,
    //          });
    //          // getUserDetails();
    //          var audio = new Audio(ringer);
    //          audio.play();
    //        });
    //      }
    //    }
    //  })();
    homepagelistapi();
    getUserDetails();
  }, []);

  function homepagelistapi(name, log, lat) {
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      // longitude: log,
      // latitude: lat
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/homepagelistapi`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          let dict = response.data.classdata;
          let heading = dict.filter((data) => {
            return data?.title != null && data?.title != undefined;
          });
          console.log(heading);
          setTitle(heading);
          // setName(response.data.classdata)
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  const getUserDetails = () => {
    var qs = require("qs");
    var dataNotification = qs.stringify({
      user_id: Id,
      page: 1,
    });
    var configNotification = {
      method: "post",
      url: `${baseUrl}/healthcare/listnotificationdata`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataNotification,
    };

    axios(configNotification)
      .then(function (response) {
        setNotificationCount(response.data.unreadcount);
        dispatch({
          type: "headercheck",
          payload: {
            headercheckflag: new Date(),
          },
        });
      })
      .catch(function (error) {
        console.log("Error");
      });
  };

  function handleSignOut() {
    Swal.fire({
      title: "Are you sure you want to logout?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        var qs = require("qs");
        var data = qs.stringify({
          user_id: Id,
        });

        const config = {
          method: "post",
          url: `${baseUrl}/healthcare/logout`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            toast.success(response.data.message);
            if (response.data.status === "1") {
              history.push("/login");
              window.localStorage.clear();
              // window.location.reload(true);
            }
          })
          .catch(function (error) {
            toast.error(error.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function handleProceed() {
    if (role_id == null) {
      history.push("/login");
    } else {
      history.push("/cart-section");
    }
  }
  function handleProfile() {
    if (role_id == "3") {
      history.push("/dashboard/account-info");
    } else if (role_id == "29") {
      history.push("/pracitioner/myprofile");
    } else {
      history.push("/dashboard/myprofile");
    }
  }

  let total = 0;

  const handleNotification = () => {
    if (role_id === "3") {
      history.push("/dashboard/user/listnotifications");
    }
    if (role_id === "2") {
      history.push("/dashboard/listnotifications");
    }
    if (role_id === "5") {
      history.push("/dashboard/pharmacist/listnotifications");
    }
    if (role_id === "4") {
      history.push("/dashboard/admin/notification");
    }
    if (notificationCount != 0) {
      var qs = require("qs");
      var dataNotification = qs.stringify({
        user_id: Id,
      });
      var configNotification = {
        method: "post",
        url: `${baseUrl}/healthcare/readnotification`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: dataNotification,
      };

      axios(configNotification)
        .then(function (response) {
          if (response.data.status === "1") {
            setNotificationCount(0);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  function enterKeySearch(e) {
    if (search) {
      if (e.key === "Enter") {
        history.push(`/search/result?key=${search}`);
        setsearch("");
      }
    } else {
      console.log("Outside enter key");
    }
  }

  function handleChange(e) {
    setsearch(e.target.value);
    if (e.target.value) {
      searchResult(e.target.value);
    } else {
      console.log("Outside");
    }
  }
  async function searchResult(text) {
    var qs = require("qs");
    let data;
    data = qs.stringify({
      searchkey: text,
      user_id: Id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchresultsheader`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    await axios(config)
      .then(async function (response) {
        setdata([]);
        await setdata(response.data.rearchresult);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  const handleClick = (e) => {
    console.log(e);
  };

  const handleNavigate = (item) => {
    history.push(`/OfferProducts/?title=${item?.title}&id=${item?.id}`);
  };

  return (
    <Box className={container}>
      <TopBar />
      <Box className={subContainer}>
        <Box className={logoContainer}>
          <Link href={'/'}>
            <Image src={logo} alt={"medy"} className={logoimg} />
          </Link>
          <Box className={autocompleteContainer}>
            <Autocomplete
              options={data}
              getOptionLabel={(option) => option?.name}
              className={autocomplete}
              onChange={(e, val) => {
                setsearch("");
                router.push(`/Products/Details/${val?.slug}`);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for wellness products"
                  onChange={handleChange}
                />
              )}
            />
          </Box>
        </Box>
        <Box className={buttonsContainer}>
          <Button
            variant={"contained"}
            className={hidden}
            onClick={() => {
              history.push("/UploadPrescription");
            }}
            sx={{
              borderRadius: "50px",
              textTransform: "unset",
              padding: "10px",
              minWidth: "120px",
              whiteSpace: "nowrap",
            }}
          >
            <UploadFileIcon sx={{ margin: "5px", fontSize: "18px" }} />
            Upload eRx
          </Button>

          <Box className={iconsSection}>
            {role_id == 2 ||
            role_id == 4 ||
            role_id == 5 ||
            role_id == 6 ||
            role_id == 7 ||
            role_id == 8 ||
            role_id == 9 ||
            role_id == 10 ||
            role_id == 11 ||
            role_id == 12 ||
            role_id == 13 ||
            role_id == 1 ? (
              ""
            ) : (
              <>
                <Badge
                  badgeContent={
                    state.cartCount < 0
                      ? 0
                      : state.cartCount === 0 && localCartCount !== null
                      ? localCartCount
                      : state.cartCount
                  }
                  color="primary"
                >
                  <Box
                    className={`${iconsContainer} cart`}
                    sx={{ position: "relative" }}
                  >
                    <Box>
                      <ShoppingCartIcon
                        sx={{
                          color: (theme) => theme.palette.grey[500],
                          fontSize: "20px",
                        }}
                      />
                    </Box>
                    <Typography>Cart</Typography>
                    <HeaderCart
                      state={state}
                      localCartData={localCartData}
                      localCartCount={localCartCount}
                      total={total}
                      handleProceed={handleProceed}
                    />
                  </Box>
                </Badge>
                <Badge badgeContent={4} color="primary">
                  <Box className={iconsContainer}>
                    <Box>
                      <FavoriteBorderIcon
                        sx={{
                          color: (theme) => theme.palette.grey[500],
                          fontSize: "20px",
                        }}
                      />
                    </Box>
                    <Typography>Wishlist</Typography>
                  </Box>
                </Badge>
              </>
            )}

            <Link href={"/Signin"}>
              <Box className={iconsContainer}>
                <Box>
                  <LoginIcon
                    sx={{
                      color: (theme) => theme.palette.grey[500],
                      fontSize: "20px",
                    }}
                  />
                </Box>

                <Typography>Customer Signin</Typography>
              </Box>
            </Link>
            <Link href={"/Signup"}>
              <Box className={`${iconsContainer} ${hidden}`}>
                <Box>
                  <PersonIcon
                    sx={{
                      color: (theme) => theme.palette.grey[700],
                      fontSize: "20px",
                    }}
                  />
                </Box>

                <Typography>Sign up</Typography>
              </Box>
            </Link>
          </Box>

          <Box>
            <Button
              className={partnerButton}
              onClick={() => {
                history.push("/PartnerProgram");
              }}
            >
              <Image
                src={partner}
                alt={"meddy partners"}
                style={{ width: "90px", height: "auto" }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={navContainer}>
        <Box className={navSubContainer}>
          <Box className={navigationContainer}>
            <Box className={`${card} healthcare`}>
              <Image
                src={healthcare}
                alt={"medy healthcare"}
                style={{ width: "60px", height: "auto" }}
              />
              <Typography className={typo}>Healthcare Products</Typography>
              <Box className={`${dropDown} healthcaredropdown`}>
                <List>
                  {title?.map((item, i) => {
                    let string = item?.title?.replace(/[&/ ]/g, "");
                    return (
                      <ListItem key={i}>
                        {(() => {
                          if (item.title == "Alternative Medicines(TCAM)") {
                            return (
                              <Box onClick={() => handleNavigate(item)}>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {item.title}
                                </Typography>
                              </Box>
                            );
                          } else if (item.title == "Offers") {
                            return (
                              <Box onClick={() => handleNavigate(item)}>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {item.title}
                                </Typography>
                              </Box>
                            );
                          } else if (item.title == "Offer") {
                            return (
                              <Box onClick={() => handleNavigate(item)}>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {item.title}
                                </Typography>
                              </Box>
                            );
                          } else {
                            return (
                              <Box onClick={() => handleNavigate(item)}>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {item.title}
                                </Typography>
                              </Box>
                            );
                          }
                        })()}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Link href={"/ConsultDoctor"}>
              <Box className={card}>
                <Image
                  src={consultadoctor}
                  alt={"medy healthcare"}
                  style={{ width: "60px", height: "auto" }}
                />
                <Typography className={typo}>Consult A Doctor</Typography>
              </Box>
            </Link>
            <Link href={"/LabTestDetails"}>
              <Box className={card}>
                <Image
                  src={diagnostics}
                  alt={"medy healthcare"}
                  style={{ width: "60px", height: "auto" }}
                />
                <Typography className={typo}>Diagnostics</Typography>
              </Box>
            </Link>
            <Link href={"/BlogLists?type=Image"}>
              <Box className={card}>
                <Image
                  src={healthcorner}
                  alt={"medy healthcare"}
                  style={{ width: "60px", height: "auto" }}
                />
                <Typography className={typo}>Health Corner</Typography>
              </Box>
            </Link>
            <Link href={"/Others"}>
              <Box className={card}>
                <Image
                  src={tcam}
                  alt={"medy healthcare"}
                  style={{ width: "60px", height: "auto" }}
                />
                <Typography className={typo}>
                  TCAM (Alternative Therapies)
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
        <Box className={dropdown}>
          <Box className={fieldContainer}>
            <Box className={autocompleteContainerdrop}>
              <Autocomplete
                options={data}
                getOptionLabel={(option) => option?.name}
                className={autocomplete}
                onChange={(e, val) => {
                  setsearch("");
                  router.push(`/products/${val?.slug}`);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for wellness products"
                    onChange={handleChange}
                  />
                )}
              />
            </Box>
            <Box>
              <IconButton
                sx={{
                  padding: "10px",
                  borderRadius: "5px",
                  background: (theme) => theme.palette.primary.main,
                }}
                onClick={() => setactivedrop(!activedrop)}
              >
                <MenuIcon sx={{ color: (theme) => theme.palette.white.main }} />
              </IconButton>
            </Box>
          </Box>
          <Box className={`${dropList} ${activedrop ? activeDrop : ""}`}>
            <Box sx={{ display: activedrop ? "block" : "none" }}>
              <Box className={`${card} healthcare`}>
                <Image
                  src={healthcare}
                  alt={"medy healthcare"}
                  style={{ width: "60px", height: "auto" }}
                />
                <Typography className={typo}>Healthcare Products</Typography>
                <Box className={`${dropDown} healthcaredropdown`}>
                  <List>
                    {title?.map((item, i) => {
                      let string = item?.title?.replace(/[&/ ]/g, "");
                      return (
                        <ListItem key={i}>
                          {(() => {
                            if (item.title == "Alternative Medicines(TCAM)") {
                              return (
                                <Box onClick={() => handleNavigate(item)}>
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {item.title}
                                  </Typography>
                                </Box>
                              );
                            } else if (item.title == "Offers") {
                              return (
                                <Box onClick={() => handleNavigate(item)}>
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {item.title}
                                  </Typography>
                                </Box>
                              );
                            } else if (item.title == "Offer") {
                              return (
                                <Box onClick={() => handleNavigate(item)}>
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {item.title}
                                  </Typography>
                                </Box>
                              );
                            } else {
                              return (
                                <Box onClick={() => handleNavigate(item)}>
                                  <Typography sx={{ fontSize: "14px" }}>
                                    {item.title}
                                  </Typography>
                                </Box>
                              );
                            }
                          })()}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
              <Link href={"/ConsultDoctor"}>
                <Box className={card}>
                  <Image
                    src={consultadoctor}
                    alt={"medy healthcare"}
                    style={{ width: "60px", height: "auto" }}
                  />
                  <Typography className={typo}>Consult A Doctor</Typography>
                </Box>
              </Link>
              <Link href={"/LabTestDetails"}>
                <Box className={card}>
                  <Image
                    src={diagnostics}
                    alt={"medy healthcare"}
                    style={{ width: "60px", height: "auto" }}
                  />
                  <Typography className={typo}>Diagnostics</Typography>
                </Box>
              </Link>
              <Link href={"/BlogLists?type=Image"}>
                <Box className={card}>
                  <Image
                    src={healthcorner}
                    alt={"medy healthcare"}
                    style={{ width: "60px", height: "auto" }}
                  />
                  <Typography className={typo}>Health Corner</Typography>
                </Box>
              </Link>
              <Link href={"/Others"}>
                <Box className={card}>
                  <Image
                    src={tcam}
                    alt={"medy healthcare"}
                    style={{ width: "60px", height: "auto" }}
                  />
                  <Typography className={typo}>
                    TCAM (Alternative Therapies)
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  console.log("hello");
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  };
}

export default Header;
