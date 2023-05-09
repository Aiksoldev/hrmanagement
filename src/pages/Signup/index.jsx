"use client";
import {
  Box,
  Button,
  Checkbox,
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
import React, { useContext, useEffect, useState } from "react";
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
import PhoneInput from "react-phone-input-2";
import EastIcon from "@mui/icons-material/East";
import Geocode from "react-geocode";

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
      width: "60%",

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
    FieldInRow: {
      display: "flex",
      alignItems: "top",
      gap: "40px",
      justifyContent: "space-between",
    },
  };
});

const Signup = () => {
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
    FieldInRow,
  } = useStyle();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [password, setPassword] = useState(false);
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const searchh = useRouter().search;
  let UserIDhere = new URLSearchParams(searchh).get("id");
  const baseUrl = getBaseUrl();
  let history = useRouter();
  const [custom, setCustom] = useState(false);
  let Id = 3;
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});
  const [UserID, setUserID] = useState(UserIDhere);
  const [mobile, setMobile] = useState();

  const [check, setCheck] = useState("");
  const [dialCode, setDialCode] = useState();
  const [latitudes, setlatitude] = useState([]);
  const [longitudes, setLongitude] = useState([]);
  const [getaddresses, setAddresses] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const handleCustomAddress = (e) => {
    setCustom(e.target.checked);
  };
 
  const successPosition = async (position) => {
    setCheck("granted");
    setlatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    Geocode.setApiKey(process.env.NEXT_PUBLIC_REACT_APP_MAP_KEYS);
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const formatted_address = response.results[0].formatted_address;
        setAddresses(formatted_address);
        setTimeout(() => {
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response) => {
              for (
                let i = 0;
                i < response.results[0].address_components.length;
                i++
              ) {
                for (
                  let j = 0;
                  j < response.results[0].address_components[i].types.length;
                  j++
                ) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                      setCity(
                        response.results[0].address_components[i].long_name
                      );
                      break;
                    case "administrative_area_level_1":
                      setState(
                        response.results[0].address_components[i].long_name
                      );
                      break;
                    case "country":
                      setCountry(
                        response.results[0].address_components[i].long_name
                      );
                      break;
                  }
                }
              }
            },
            (error) => {
              console.error(error);
            }
          );
        }, 1000);
      },
      (error) => {
        console.error("error", error);
      }
    );
  };

  const deniedPosition = (error) => {
    setCheck("");
    alert(
      "You denied to location permission,\nAllow the permission from browser's settings or add you address manually."
    );
  };
  const getCurrentLoaction = () => {
    console.log('loc')
    if ("geolocation" in navigator) {
      // navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos),
        (err) => deniedPosition(err)
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.permissions
    //     .query({ name: "geolocation" })
    //     .then(function (result) {
    //       if (result.state === "granted") {
    //         setCheck(result.state);
    //         console.log(result.state);
    //         //If granted then you can directly call your function here
    //       }
    //       result.onchange = function () {
    //         setCheck(result.state);
    //       };
    //     });
    // } else {
    //   alert("Sorry Not available!");
    // }

    setCustom(UserID == null ? false : true);
    getCurrentLoaction();
  }, []);

  const handleChange = (e, fieldsValue, checked) => {
    if (checked === true || checked === false) {
      fields[e.target.name] = checked;
      setFields(fields);
    } else {
      let fields = fieldsValue;
      fields[e.target.name] = e.target.value;
      setFields(fields);
    }
  };

  const handleMobile = (val, dial) => {
    setMobile(val);
    setDialCode(dial);
  };





  async function submitRegisterModuleForm(e, fieldsValue) {
    e.preventDefault();
    if (check === "granted") {
      if (validateForm(fieldsValue)) {
        // if (captchaToken !== null)
        {
          var qsData = require("qs");
          if (country == "United Arab Emirates") {
            var City = state;
          } else {
            var City = city;
          }
          var data = qsData.stringify({
            email: fieldsValue.email,
            referencecode: UserID,
            mobile: mobile.slice(dialCode.length),
            user_name: fieldsValue.username,
            fcm_token: "",
            password: password,
            country_code: dialCode,
            role_id: Id,
            device_type: "Website",
            id: Id,
            current_location: getaddresses,
            country: country,
            state: state,
            city: City,
            latitude: latitudes,
            longitude: longitudes,
          });
          axios
            .post(`${baseUrl}/healthcare/userregister`, data)
            .then(function (response) {
              if (response.data.status === "0") {
                toast.error(response.data.message);
              } else {
                toast.success(response.data.message);
              }
              const timer = setTimeout(() => {
                if (response.data.status === "1") {
                  sendOTP(fieldsValue.email);
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
        // else {
        //   toast.error("Please Check Captcha!");
        // }
      }
    }
  }

  async function sendOTP(fieldsValue) {
    const data = {
      email_number: fieldsValue,
    };

    axios
      .post(`${baseUrl}/healthcare/sendcodeforgotpassword`, data)
      .then(function (response) {
        toast.success(response.data.message);

        const timer = setTimeout(() => {
          if (response.data.status === "1") {
            history.push({
              pathname: "/verify-otp",
              search: `?email=${data.email_number}`,
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

  function validateForm(fieldsValue) {
    let fields = fieldsValue;
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your name.";
    }

    if (mobile == undefined) {
      formIsValid = false;
      errors["mobile"] = "*Please enter your mobile number.";
    }

    if (custom) {
      if (UserID == null || UserID == "") {
        if (!fields["referencecode"]) {
          formIsValid = false;
          errors["referencecode"] = "*Please enter Referral code.";
        }
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }
    if (password == "") {
      formIsValid = false;
      errors["Password"] = "*Please enter your password.";
    }

    setErrors(errors);
    return formIsValid;
  }












  return (
    <>
      <Head>
        <title>Medy:Signup</title>
      </Head>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={contentContainer}>
            <form
              className={formContainer}
              onSubmit={(e) => {
                submitRegisterModuleForm(e, fields);
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Sign Up
                </Typography>
              </Box>
              <Box>
                <Typography>Sign Up by entering the fields below.</Typography>
              </Box>
              <Box className={divider} />
              <Box className={FieldInRow}>
                <FormControl fullWidth>
                  <Typography sx={{ padding: "5px 0px" }}>User Name</Typography>
                  <TextField
                    placeholder="User Name"
                    fullWidth
                    name="username"
                    onChange={(e) => {
                      handleChange(e, fields);
                    }}
                    size="small"
                    InputProps={{ style: { borderRadius: "50px" } }}
                  />
                  <Typography color={"error"}>{errors.username}</Typography>
                </FormControl>

                <FormControl fullWidth>
                  <Typography sx={{ padding: "5px 0px" }}>E-Mail</Typography>
                  <TextField
                    placeholder="E-Mail"
                    fullWidth
                    name="email"
                    onChange={(e) => {
                      handleChange(e, fields);
                    }}
                    size="small"
                    InputProps={{ style: { borderRadius: "50px" } }}
                  />
                  <Typography color={"error"}>{errors.email}</Typography>
                </FormControl>
              </Box>
              <Box className={FieldInRow}>
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
                  <Typography color={"error"}>{errors.Password}</Typography>
                </FormControl>
                <FormControl fullWidth>
                  <Typography sx={{ padding: "5px 0px" }}>
                    Mobile Number
                  </Typography>
                  <PhoneInput
                    country={"us"}
                    onChange={(e, data) => handleMobile(e, data.dialCode)}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "100px",
                      background: "transparent",
                    }}

                    // inputClass="react-tel-input form-control"

                    // value={this.state.phone}
                    // onChange={(phone) => this.setState({ phone })}
                  />
                  <Typography color={"error"}>{errors.mobile}</Typography>
                </FormControl>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    checked={custom}
                    value={custom}
                    onChange={(e) => handleCustomAddress(e)}
                  />
                  {custom ? (
                    <FormControl>
                      <TextField
                        placeholder="Referral code"
                        //   fullWidth
                        name="referencecode"
                        onChange={(e) => {
                          handleChange(e, fields);
                        }}
                        size="small"
                        InputProps={{ style: { borderRadius: "50px" } }}
                      />
                      <Typography color={"error"}>
                        {errors.referencecode}
                      </Typography>
                    </FormControl>
                  ) : null}
                </Box>
              </Box>
              <Box>
                {check === "granted" ? (
                  <Button fullWidth type="submit" className={button}>
                    Signup{" "}
                    <Box sx={{ position: "absolute", right: "10px" }}>
                      <EastIcon />
                    </Box>
                  </Button>
                ) : (
                  <Button fullWidth className={button}>
                    Please Enable Location{" "}
                    <Box
                      sx={{ position: "absolute", right: "10px", top: "12px" }}
                    >
                      <EastIcon />
                    </Box>
                  </Button>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: "400" }}>
                  Have an account?{" "}
                  <Link href={"/Signin"}>
                    <Typography
                      component={"span"}
                      color={"primary"}
                      sx={{ fontWeight: "500" }}
                    >
                      Login
                    </Typography>
                  </Link>
                </Typography>
              </Box>

              {/* <Box className={"google-btn"}>
                <GoogleLogin
                  clientId="834837942867-sb5bhf94pcnvj6jsceq5mi2c5vdglb3m.apps.googleusercontent.com"
                  buttonText="Google Login"
                  style={{ border: "1px solid red" }}
                  //   onSuccess={responseGoogle}
                  //   onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Box> */}
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

export default Signup;
