"use client";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  dividerClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GoogleLogin } from "react-google-login";
import logoimg from "../../Assets/logo.png";
import Image from "next/image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { store } from "@/Store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const useStyle = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "url(./backoverlay.png)",
      backgroundColor: "#25aae1",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    subContainer: {
      width: "100%",
      maxWidth: "900px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      minHeight: "90vh",
      padding: "20px",
      height: "100%",
      borderRadius: "20px",
      backgroundColor: theme.palette.white.main,
      background: "url(./login-sidbar.png)",
      backgroundPosition: "100% 0",
      backgroundSize: "57%",
      backgroundRepeat: "no-repeat",
      gap: "20px",
    },
    logoContainer: {
      width: "100%",

      display: "flex",
      justifyContent: "end",
      padding: "0px 30px",

      [theme.breakpoints.down("md")]: {
        padding: "0px",
        justifyContent: "start",
      },
    },
    formContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column-reverse",
      },
    },
    divider: {
      width: "80px",
      height: "3px",
      background: "#25aae1",
    },
    button: {
      background: "#8cc63f",
      padding: "10px 20px",
      borderRadius: "100px",
      color: theme.palette.white.main,
      fontWeight: "500",
      fontSize: "1rem",
      position: "relative",
      border: "2px solid #8cc63f",
      marginTop: "10px",
      transition: "0.5s",
      "&:hover": {
        background: theme.palette.white.main,
        color: ` #8cc63f !important`,
        border: "2px solid #8cc63f",
      },
    },
    logo: {
      height: "200px",
      width: "200px",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.white.main,
      [theme.breakpoints.down("md")]: {
        height: "auto",
        width: "auto",
        background: "transparent",
      },
    },
    innerlogobox: {
      height: "170px",
      width: "170px",
      backgroundColor: "#e3f4fc",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        height: "auto",
        width: "auto",
        background: "transparent",
      },
    },
  };
});

const Signin = () => {
  const {
    container,
    subContainer,
    logoContainer,
    formContainer,
    contentContainer,
    divider,
    button,
    logo,
    innerlogobox,
  } = useStyle();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [FcmToken, setFcmToken] = useState("");
  const [password, setPassword] = useState(false);
  // const url = localStorage.getItem("url");
  let history = useRouter();
  const responseGoogle = (response) => {
    let CARTlogin = window.localStorage.getItem("CARTlogin");
    let uid;
    let ipData = localStorage.getItem("IP");
    if (ipData === null) {
      uid = uuidv4();
      uid = uid.replace(/-|\s/g, "");
      dispatch({
        type: "ADD_UID",
        payload: { uid: uid },
      });
      ipData = uid;
      cookies.set("IP", uid);
      localStorage.setItem("IP", uid);
    }
    const data = {
      email: response.profileObj.email,
      user_name: response.profileObj.name,
      fcm_token: FcmToken,
      session_id: ipData,
      device_type: "Website",
      social_id: response.googleId,
      profile_photo: response.profileObj.imageUrl,
      role_id: "3",
      social_name: "google",
    };

    axios
      .post(`${baseUrl}/healthcare/socialregister`, data)
      .then(function (response) {
        toast.success(response.data.message);
        const timer = setTimeout(async () => {
          if (response.data.status === "1") {
            dispatch({
              type: "ADD_CART",
              payload: {
                cartCount: response.data.cartitemscount,
                cartData: response.data.cartdata,
              },
            });
            await cookies.set(
              "cart",
              JSON.stringify(response.data.cartitemscount)
            );
            await localStorage.setItem(
              "cart",
              JSON.stringify(response.data.cartitemscount)
            );

           await cookies.set(
              "role_id",
              JSON.stringify(response.data.Userdata[0].Role_id)
            );
            await localStorage.setItem(
              "role_id",
              JSON.stringify(response.data.Userdata[0].Role_id)
            );

           await cookies.set("id", response.data.Userdata[0].id);

            await localStorage.setItem("id", response.data.Userdata[0].id);

           await cookies.set("UserID", response.data.Userdata[0].UserID);
            await localStorage.setItem(
              "UserID",
              response.data.Userdata[0].UserID
            );

           await cookies.set(
              "Profile_Photo",
              response.data.Userdata[0].Profile_Photo
            );
            await localStorage.setItem(
              "Profile_Photo",
              response.data.Userdata[0].Profile_Photo
            );
           await cookies.set("token", response.data.Userdata[0].token);
            await localStorage.setItem(
              "token",
              response.data.Userdata[0].token
            );

           await cookies.set("insurance_id", response.data.Userdata[0].insurance_id);
            await localStorage.setItem(
              "insurance_id",
              response.data.Userdata[0].insurance_id
            );

           await cookies.set("Username", response.data.Userdata[0].Username);
            await localStorage.setItem(
              "Username",
              response.data.Userdata[0].Username
            );

           await cookies.set("Email_Phone", response.data.Userdata[0].Email_Phone);
            await localStorage.setItem(
              "Email_Phone",
              response.data.Userdata[0].Email_Phone
            );
            if (response.data.Userdata[0].Role_id === 1) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/doctor");
              }
            } else if (response.data.Userdata[0].Role_id === 2) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/pharmacy");
              }
            } else if (response.data.Userdata[0].Role_id === 4) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/admin");
              }
            } else if (response.data.Userdata[0].Role_id === 5) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/pharmacist");
              }
            } else {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else if (CARTlogin == 2) {
                history.push("/homedoctor");
              } else {
                history.push("/dashboard/user");
              }
            }
          }
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.status === "0") {
            toast.error(error.response.data.message);
          } else {
            toast.error("Internal server error please wait.");
          }
        }
      });
  };
  const loginUser =
    typeof window !== "undefined" ? localStorage.getItem("Username") : "";
  if (loginUser) history.push("/");
  //if (role_id == 6) history.push('/')
  const [state, dispatch] = useContext(store);
  const getBaseUrl = () => {
    console.log(process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API);
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };

  let ip = typeof window !== "undefined" ? localStorage.getItem("IP") : "";

  function resendOTPCode(email) {
    const data = {
      email_number: email,
    };
    axios
      .post(`${baseUrl}/healthcare/sendcodeforgotpassword`, data)
      .then(function (response) {
        toast.success(response.data.message);

        history.push({
          pathname: "/verify-otp",
          search: `?email=${data.email_number}`,
        });
        const timer = setTimeout(() => {}, 2000);
        return () => clearTimeout(timer);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.status === "0") {
            toast.error(error.response.data.message);
          } else {
            toast.error("Internal server error.");
          }
        }
      });
  }

  const baseUrl = getBaseUrl();

  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(e, fieldsValue) {
    let fields = fieldsValue;

    fields[e.target.name] = e.target.value;
    setFields(fields);
  }
  function submitVerifyOtpForm(e, fieldsValue) {
    let id = localStorage.getItem("id");
    e.preventDefault();
    let CARTlogin = localStorage.getItem("CARTlogin");
    let tokenId = "";
    let uid;
    let ip = id;
    let ipData = localStorage.getItem("IP");
    if (ipData === null) {
      uid = uuidv4();
      uid = uid.replace(/-|\s/g, "");
      dispatch({
        type: "ADD_UID",
        payload: { uid: uid },
      });
      ipData = uid;
      cookies.set('IP',uid)
      localStorage.setItem("IP", uid);
    }
    // if (validateForm(fieldsValue)) {
    const data = {
      email_number: fieldsValue.email_number,
      password: password,
      check: 1,
      session_id: ipData,
      device_type: "Website",
      fcm_token: FcmToken,
    };
    axios
      .post(`${baseUrl}/healthcare/verifyaccount`, data)
      .then(function (response) {
        setStatus(response.data.ActiveStatus);
        if (response.data.status === "1") {
          toast.success(response.data.message);
        }
        const timer = setTimeout(async () => {
          if (response.data.status === "1") {
            if (response.data.Userdata[0].Role_id === 6) {
            } else {
              dispatch({
                type: "ADD_CART",
                payload: {
                  cartCount: response.data.cartitemscount,
                  cartData: response.data.cartdata,
                },
              });

               await cookies.set(
                 "cart",
                 JSON.stringify(response.data.cartitemscount)
               );
              await localStorage.setItem(
                "cart",
                JSON.stringify(response.data.cartitemscount)
              );


               await cookies.set(
                 "role_id",
                 JSON.stringify(response.data.Userdata[0].Role_id)
               );
              await localStorage.setItem(
                "role_id",
                JSON.stringify(response.data.Userdata[0].Role_id)
              );


                await cookies.set("id", response.data.Userdata[0].id);
              await localStorage.setItem("id", response.data.Userdata[0].id);


              await cookies.set("UserID", response.data.Userdata[0].UserID);
              await localStorage.setItem(
                "UserID",
                response.data.Userdata[0].UserID
              );

              await cookies.set(
                "Profile_Photo",
                response.data.Userdata[0].Profile_Photo
              );


              await localStorage.setItem(
                "Profile_Photo",
                response.data.Userdata[0].Profile_Photo
              );

               await cookies.set("token", response.data.Userdata[0].token);
              await localStorage.setItem(
                "token",
                response.data.Userdata[0].token
              );


              await cookies.set(
                "insurance_id",
                response.data.Userdata[0].insurance_id
              );
              await localStorage.setItem(
                "insurance_id",
                response.data.Userdata[0].insurance_id
              );

               await cookies.set(
                 "isGroup",
                 response.data.Userdata[0].PharmacyGroup
               );
              await localStorage.setItem(
                "isGroup",
                response.data.Userdata[0]?.PharmacyGroup
              );


               await cookies.set(
                 "groupCode",
                 response.data.Userdata[0].groupCode
               );
              await localStorage.setItem(
                "groupCode",
                response.data.Userdata[0]?.groupCode
              );

               await cookies.set(
                 "emirates_id",
                 response.data.Userdata[0].emirates_id
               );
              await localStorage.setItem(
                "emirates_id",
                response.data.Userdata[0].emirates_id
              );

               await cookies.set(
                 "Username",
                 response.data.Userdata[0].Username
               );
              await localStorage.setItem(
                "Username",
                response.data.Userdata[0].Username
              );

               await cookies.set(
                 "Email_Phone",
                 response.data.Userdata[0].Email_Phone
               );
              await localStorage.setItem(
                "Email_Phone",
                response.data.Userdata[0].Email_Phone
              );
            }
            if (response.data.Userdata[0].Role_id === 1) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/myprofile");
              }
            } else if (response.data.Userdata[0].Role_id === 2) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/pharmacy");
              }
            } else if (response.data.Userdata[0].Role_id === 13) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/pharmacygroup");
              }
            } else if (
              response.data.Userdata[0].Role_id === 28 ||
              response.data.Userdata[0].Role_id === 31 ||
              response.data.Userdata[0].Role_id === 30 ||
              response.data.Userdata[0].Role_id === 32 ||
              response.data.Userdata[0].Role_id === 33 ||
              response.data.Userdata[0].Role_id === 34 ||
              response.data.Userdata[0].Role_id === 35 ||
              response.data.Userdata[0].Role_id === 36 ||
              response.data.Userdata[0].Role_id === 37 ||
              response.data.Userdata[0].Role_id === 38 ||
              response.data.Userdata[0].Role_id === 39 ||
              response.data.Userdata[0].Role_id === 40 ||
              response.data.Userdata[0].Role_id === 41 ||
              response.data.Userdata[0].Role_id === 42 ||
              response.data.Userdata[0].Role_id === 43
            ) {
              history.push("/dashboard/tcamgroup");
            } else if (response.data.Userdata[0].Role_id === 29) {
              history.push("/dashboard/practitioner");
            } else if (response.data.Userdata[0].Role_id === 4) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/admin");
              }
            } else if (response.data.Userdata[0].Role_id === 5) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/pharmacist");
              }
            } else if (response.data.Userdata[0].Role_id === 6) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/");
              } else {
                history.push("/");
              }
            } else if (response.data.Userdata[0].Role_id === 7) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/hospital");
              }
            } else if (
              response.data.Userdata[0].Role_id === 11 ||
              response.data.Userdata[0].Role_id === 9 ||
              response.data.Userdata[0].Role_id === 10 ||
              response.data.Userdata[0].Role_id === 16 ||
              response.data.Userdata[0].Role_id === 17 ||
              response.data.Userdata[0].Role_id === 18 ||
              response.data.Userdata[0].Role_id === 19 ||
              response.data.Userdata[0].Role_id === 20 ||
              response.data.Userdata[0].Role_id === 21 ||
              response.data.Userdata[0].Role_id === 22 ||
              response.data.Userdata[0].Role_id === 23 ||
              response.data.Userdata[0].Role_id === 24 ||
              response.data.Userdata[0].Role_id === 25 ||
              response.data.Userdata[0].Role_id === 26 ||
              response.data.Userdata[0].Role_id === 27
            ) {
              history.push("/dashboard/tcam");
            } else if (response.data.Userdata[0].Role_id === 14) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/hospitalgroup");
              }
            } else if (response.data.Userdata[0].Role_id === 15) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else {
                history.push("/dashboard/labgroup");
              }
            } else if (response.data.Userdata[0].Role_id === 9) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/dashboard/myprofile");
              } else {
                history.push("/dashboard/myprofile");
              }
            } else if (response.data.Userdata[0].Role_id === 10) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/dashboard/myprofile");
              } else {
                history.push("/dashboard/myprofile");
              }
            } else if (response.data.Userdata[0].Role_id === 11) {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/dashboard/myprofile");
              } else {
                history.push("/dashboard/myprofile");
              }
            } else if (response.data.Userdata[0].Role_id === 12) {
              history.push("/dashboard/list/blog");
            } else {
              if (CARTlogin != null && CARTlogin == 1) {
                history.push("/cart-section");
              } else if (CARTlogin == 2) {
                history.push("/homedoctor");
              } else if (
                response.data.Userdata[0].Role_id === 3 &&
                history.push("/homedoctor")
                // doctor_url === "/dashboard/doctor-information"
              ) {
                //    history.push(url);
              } else {
                history.push("/dashboard/user");
              }
            }
          } else if (response.data.status === "0") {
            toast.error(response.data.message);
            if (response?.data?.verify == false) {
              const timer1 = setTimeout(() => {
                resendOTPCode(response?.data?.email);
              }, 3000);
              return () => clearTimeout(timer1);
            }
          }
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch(function (error) {
        if (error.message === "Network Error")
          toast.error("Server not working.");
        else toast.error(error.response.data.message);
      });
  }
  return (
    <>
      <Head>
        <title>Medy:Signin</title>
      </Head>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={contentContainer}>
            <form
              className={formContainer}
              onSubmit={(e) => {
                submitVerifyOtpForm(e, fields);
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Login
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Login to your existing account by entering your mobile number
                  or e-mail and password.
                </Typography>
              </Box>
              <Box className={divider} />
              <Box>
                <FormControl fullWidth>
                  <Typography sx={{ padding: "5px 0px" }}>
                    Mobile Number / E-Mail
                  </Typography>
                  <TextField
                    placeholder="Mobile Number / E-Mail"
                    fullWidth
                    name="email_number"
                    onChange={(e) => {
                      handleChange(e, fields);
                    }}
                    size="small"
                    InputProps={{ style: { borderRadius: "50px" } }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <Typography sx={{ padding: "5px 0px" }}>Password</Typography>
                  <OutlinedInput
                    sx={{ borderRadius: "100px" }}
                    size="small"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <Button fullWidth type="submit" className={button}>
                  Login
                </Button>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: "400" }}>
                  Don’t have an account? Let’s{" "}
                  <Link href={"/Signup"}>
                    <Typography
                      component={"span"}
                      color={"primary"}
                      sx={{ fontWeight: "500" }}
                    >
                      Sign Up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
              <Box>
                <Link href={"/ForgotPassword"}>
                  <Typography
                    color={"primary"}
                    sx={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Forgot Password
                  </Typography>
                </Link>
              </Box>
              <Box className={"google-btn"}>
                <GoogleLogin
                  clientId="834837942867-sb5bhf94pcnvj6jsceq5mi2c5vdglb3m.apps.googleusercontent.com"
                  buttonText="Google Login"
                  style={{ border: "1px solid red" }}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Box>
            </form>
            <Box className={logoContainer}>
              <Box className={logo}>
                <Box className={innerlogobox}>
                  <Image
                    src={logoimg}
                    alt="medy"
                    style={{ width: "120px", height: "auto" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <ToastContainer />
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  console.log("hello");
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  };
}

export default Signin;
