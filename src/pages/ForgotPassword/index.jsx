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

  const baseUrl = getBaseUrl();
  let history = useRouter();
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});

  function handleChange(e, fieldsValue) {
    let fields = fieldsValue;
    fields[e.target.name] = e.target.value;
    setFields(fields);
  }

  function submitForgotPasswordForm(e, fieldsValue) {
    e.preventDefault();
    if (validateForm(fieldsValue)) {
      const data = {
        email_number: fieldsValue.email_number,
      };

      axios
        .post(`${baseUrl}/healthcare/sendcodeforgotpassword`, data)
        .then(function (response) {
          toast.success(response.data.message);
          const timer = setTimeout(() => {
            if (response.data.status === "1") {
              history.push({
                pathname: "/VerifyOTP",
                query: {keyword:`?email_mobile=${fieldsValue.email_number}`},
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
    }
  }

  function validateForm(fieldsValue) {
    let fields = fieldsValue;
    let errors = {};
    let formIsValid = true;

    if (!fields["email_number"]) {
      formIsValid = false;
      errors["email_number"] = "*Please enter a mobile number or email.";
    }

    if (typeof fields["email_number"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (
        pattern.test(fields["email_number"]) ||
        fields["email_number"].match(/^[0-9]{10}$/)
      ) {
        formIsValid = true;
      } else {
        formIsValid = false;
        errors["email_number"] =
          "*Please enter a  valid email or 10 digit mobile number.";
      }
    }

    setErrors(errors);
    return formIsValid;
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
                submitForgotPasswordForm(e, fields);
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
                <Typography color={"error"}> {errors.email_number}</Typography>
              </Box>

              <Box>
                <Button fullWidth type="submit" className={button}>
                  Continue
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
