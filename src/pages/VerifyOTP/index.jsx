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
import AuthCode from "react-auth-code-input";

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

const ForgotPassword = () => {
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

 
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
let history = useRouter();
const search = history.query?.keyword
console.log(search)
const email_number = search?.split('=')[1];
console.log(email_number)
const baseUrl = getBaseUrl();
const handleChange = (otp) => {
  console.log(otp)
  setOTP(otp);
};
const [OTP, setOTP] = useState();
function resendOTPCode() {
  const data = {
    email_number: email_number,
  };

  axios
    .post(`${baseUrl}/healthcare/sendcodeforgotpassword`, data)
    .then(function (response) {
      toast.success(response.data.message);

      const timer = setTimeout(() => {}, 2000);
      return () => clearTimeout(timer);
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.status === "0") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Please fill all required details.");
        }
      }
    });
}

function VerifyOTPForResetPassword(e) {
  e.preventDefault();
  // if (validateForm(fieldsValue)) {
  const data = {
    email_number: email_number,
    verification_code: OTP,
  };

  axios
    .post(`${baseUrl}/healthcare/verifyforgotpassword`, data)
    .then(function (response) {
      toast.success(response.data.message);
      const timer = setTimeout(() => {
        if (response.data.status === "1") {
          history.push({
            pathname: "/addreset-password",
            search: `?email_mobile=${email_number}`,
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.status === "0") {
          toast.error(error.response.data.message);
        } else {
          toast.error("Please fill all required details.");
        }
      }
    });
  // }
}



  
  return (
    <>
      <Head>
        <title>Medy:Forgot Password</title>
      </Head>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={contentContainer}>
            <form
              className={formContainer}
              onSubmit={(e) => {
                VerifyOTPForResetPassword(e);
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Forgot Password
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Enter Your Email for the verification proccess we will send 4
                  digits code to your email.
                </Typography>
              </Box>
              <Box className={divider} />
              <Box sx={{ margin: "40px 0px" }}>
                <FormControl fullWidth>
                  <AuthCode
                    onChange={handleChange}
                    length={4}
                    containerClassName={"OTPContainer"}
                    inputClassName="OTPInput"
                  />
                </FormControl>
              </Box>

              <Box>
                <Button fullWidth type="submit" className={button}>
                  Continue
                </Button>
                <Typography
               
                  sx={{ cursor: "pointer",textAlign:'right', }}
                  onClick={() => resendOTPCode()}
                >
                  Resend Code{" "}
                </Typography>
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

export default ForgotPassword;
